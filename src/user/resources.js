import shortid from "shortid";

export default {
    list: (count = 50) => 
        fetch(`https://randomuser.me/api/?results=${count}`)
        .then(res => res.json())
        .then(response => response.results.map(user => ({...user, id: shortid.generate()}))),
};