import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Lists } from "src/app/core/trello/entities/lists";
import { ListsRepository } from "src/app/core/trello/interfaces/lists.repository";
import { GetBoardUseCase } from "src/app/core/trello/use-cases/get-board.use-case";

@Injectable({providedIn: 'root'})

export class ListsStorageService implements ListsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(
        public http: HttpClient,
        public getBoardUseCase: GetBoardUseCase
    ){}

    createList(lists: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getLists(): Promise<Lists[]> {

        const idBoard = await this.getBoardUseCase.execute()

        const httpParams = new HttpParams()
            .set("key", "d9331302646bf6aa76f118b098326eba")
            .set("token", "ATTAe40238ca0a9364f2157228250268a3043c527ae9f7e7250b6c5bb3dac26de3c159978967")
    
        return this.http.get<Lists[]>(this.urlTrello + idBoard + "/lists", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const listNames = response?.map((list) => list.name);
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateList(id: string, updatedBoards: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteList(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}