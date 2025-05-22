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

function calcularEdadesConCallbacks(
    personas: Persona[],
    callback: (err: Error | null, resultados?: PersonaConEdad[]) => void
): void {
    const resultados: PersonaConEdad[] = [];
    let personasProcesadas = 0;

    if (personas.length === 0) {
        callback(null, []);
        return;
    }

    personas.forEach(persona => {
        setTimeout(() => {
            try {
                const edad = calcularEdadSincrona(persona.fechaNac);
                resultados.push({ nombre: persona.nombre, edad: edad });
                personasProcesadas++;

                if (personasProcesadas === personas.length) {
                    callback(null, resultados);
                }
            } catch (error: any) {
                callback(error);
            }
        }, FIXED_TIMEOUT);
    });
}

console.log("--- Ejercicio 1: Usando Callbacks ---");
console.log("Iniciando cálculo con Callbacks...");
calcularEdadesConCallbacks(personas, (err, resultados) => {
    if (err) {
        console.error("Error al calcular edades con callbacks:", err);
    } else {
        console.log("Resultados Callbacks:", resultados);
    }
});
console.log("El cálculo con Callbacks ha sido iniciado. Los resultados aparecerán en 5 segundos.");