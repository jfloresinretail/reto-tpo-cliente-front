function renderClientInfo(client) {
    return "Name: " + client.client.name + ", "
        + "Last Name: " + client.client.lastName + ", "
        + "Age: " + client.client.age + ", "
        + "Birth Date: " + new Date(client.client.birthDate).toDateString();        
}


export { renderClientInfo };