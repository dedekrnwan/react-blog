import Noty from "noty";

export default class NotificationService {
    success = (message) => {
        const noty = new Noty({
            text: message,
            type:'success'
        })
        noty.show()
    }
    error = (message) => {
        const noty = new Noty({
            text: message,
            type:'error'
        })
        noty.show()
    }
    warning = (message) => {
        const noty = new Noty({
            text: message,
            type:'warning'
        })
        noty.show()
    }
    info = (message) => {
        const noty = new Noty({
            text: message,
            type:'info'
        })
        noty.show()
    }
}