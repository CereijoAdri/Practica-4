class Persona {
    nombre: string;
    fechaNac: Date;

    constructor(nombre: string, fechaNac: Date) {
        this.nombre = nombre;
        this.fechaNac = fechaNac;
    }
}

const personas = [
    new Persona("Manolo", new Date(2005, 4, 4)),
    new Persona("Juanes", new Date(1995, 4, 4)),
    new Persona("Kali", new Date(2000, 4, 4))
];

interface PersonaConEdad {
    nombre: string;
    edad: number;
}

function calcularEdadSincrona(fechaNac: Date): number {
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

const FIXED_TIMEOUT = 5000;

function calcularEdadesConPromesas(personas: Persona[]): Promise<PersonaConEdad[]> {
    const promesasDeCalculo = personas.map(persona => {
        return new Promise<PersonaConEdad>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const edad = calcularEdadSincrona(persona.fechaNac);
                    resolve({ nombre: persona.nombre, edad: edad });
                } catch (error) {
                    reject(error);
                }
            }, FIXED_TIMEOUT);
        });
    });
    return Promise.all(promesasDeCalculo);
}

console.log("\n--- Ejercicio 2: Usando Promesas ---");
console.log("Iniciando cálculo con Promesas...");
calcularEdadesConPromesas(personas)
    .then(resultados => {
        console.log("Resultados Promesas:", resultados);
    })
    .catch(error => {
        console.error("Error al calcular edades con promesas:", error);
    });
console.log("El cálculo con Promesas ha sido iniciado. Los resultados aparecerán en 5 segundos.");