interface Car {
    name: string;
    license: string;
    entry: Date;
}

(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function garage() {
    
        function loadData():Car[] {
            return localStorage.garage? JSON.parse(localStorage.garage): {} ;
        }

        function saveData(car: Car[]){
            localStorage.setItem("garage", JSON.stringify(car));
        }

        function insertCar(car: Car, save?: boolean){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.name}</td>
                <td>${car.license}</td>
                <td data-time="${car.entry}">${new Date(car.entry)
                    .toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })}
                </td>
                <td>
                    <button class="delete" data-placa="${car.license}">x</button>
                </td>
            `;

            // row.querySelector(".delete")?.addEventListener("click", function(){
            //     // $("#garage")?.addEventListener("click", (e) => {
            //     //     if(e.target.className === "delete")
            //     //         checkOut(e.target.parentElement.parentElement.cells);
            //     // });
            
            //     removeCar(this.dataset.license)
            // });
    
            $("#garage")?.appendChild(row);
            if(save){saveData([...loadData(), car]); };
        }
        
        function updateCar(){
            //ToDo
        }

        function removeCar(license: string){
            // const {entry, name} = loadData().find(car => car.license === license)

            // // let period = new Date() - new Date(info[2].dataset.time);
            // // period = convertPeriod(period);
    
            // // const licence = info[1].textContent;
            // // const msg = `O veículo ${info[0].textContent} de placa ${licence} permaneceu ${period} estacionado. \n\n Deseja encerrar?`;
    
            // // if(!confirm(msg)) return;
            
            // // const garage = getGarage().filter(c => c.licence !== licence);
            // // localStorage.garage = JSON.stringify(garage);
            
            // garage().renderGarage();           
        }
        
        function renderGarage(){
            $("#garage")!.innerHTML = "";
            const garage = loadData();

            if(garage.length){
                garage.forEach(car => insertCar(car))
            }
        }
    
        return {loadData, saveData, insertCar, updateCar, removeCar, renderGarage}
    }

    garage().renderGarage();
    $("#send")?.addEventListener("click", e => {
        const name = $("#name")?.value;
        const license = $("#licence")?.value;

        if(!name || !license){
            alert("Os campos nome e placa são obrigatórios.");
            return;
        }   

        garage().insertCar({ name, license, entry: new Date() }, true);
    });

    function convertPeriod(mil: number) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    };
})()