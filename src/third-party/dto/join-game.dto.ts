export class JoinGameDto {
    displayName: string;

    constructor(data?: Partial<JoinGameDto>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
