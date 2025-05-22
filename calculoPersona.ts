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

async function calcularEdadesConAsyncAwait(personas: Persona[]): Promise<PersonaConEdad[]> {
    const resultados: PersonaConEdad[] = [];

    for (const persona of personas) {
        await new Promise(resolve => setTimeout(resolve, FIXED_TIMEOUT));
        const edad = calcularEdadSincrona(persona.fechaNac);
        resultados.push({ nombre: persona.nombre, edad: edad });
    }
    return resultados;
}

console.log("\n--- Ejercicio 3: Usando Async/Await ---");
console.log("Iniciando cálculo con Async/Await...");
(async () => {
    try {
        const resultados = await calcularEdadesConAsyncAwait(personas);
        console.log("Resultados Async/Await:", resultados);
    } catch (error) {
        console.error("Error al calcular edades con async/await:", error);
    }
})();
console.log("El cálculo con Async/Await ha sido iniciado. Los resultados aparecerán en 5 segundos.");