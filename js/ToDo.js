class ToDo {

    constructor(id, status, title, description, date) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.description = description;
        this.date = date;
    }

    getToDo(){
        return [this.id, this.status, this.title, this.description, this.date];
    }

    getToDoId(id){
         return document.getElementById(id);
    }

    doneToDo(id, status, className){
        let toDoId = this.getToDoId(id);
        toDoId.setAttribute('class', className);
        toDoId.setAttribute('data-status', status);
    }

    unDoneToDo(id, status, className){
        let toDoId =  this.getToDoId(id);
        toDoId.setAttribute('class', className);
        toDoId.setAttribute('data-status', status);
    }

    removeToDo(id){
        let toDoId = this.getToDoId(id);
        toDoId.remove();
    }
}