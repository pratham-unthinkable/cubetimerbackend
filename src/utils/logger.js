const ENV = process.env.NODE_ENV || 'development';

class Logger {
    constructor() {
        this.logs = [];
    }
    log(...message){
        if(ENV === 'development') {
            console.log(...message);
        }
    }
}

export default new Logger();