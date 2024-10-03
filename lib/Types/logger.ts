class Logger {
    [x: string]: any;
    constructor() {
        this.creator = "Zayden APIs";
    }

    error(m: any) {
        return {
            creator: this.creator,
            status: false,
            message: m,
        };
    }

    success(m: any) {
        return {
            creator: this.creator,
            status: true,
            data: m,
        };
    }

    notFound() {
        return {
            creator: this.creator,
            status: false,
            message: "Not Found",
        };
    }

    unauthorized() {
        return {
            creator: this.creator,
            status: false,
            message: "Unauthorized",
        };
    }

    required(type: string) {
        return {
            creator: this.creator,
            status: false,
            message: "Required " + type,
        };
    }
}

const loggerInstance = new Logger();

export default loggerInstance;
