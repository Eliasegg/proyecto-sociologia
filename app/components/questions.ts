export interface Point {
    sociologist: string;
}

export interface Option {
    text: string;
    points: Point[];
}

export interface Question {
    id: string;
    question: string;
    options: {
        option1: Option;
        option2: Option;
    };
}

export const questions: Question[] = [
    {
        id: '1',
        question: "¿Cree que la religión debería influir en las decisiones políticas de Honduras?",
        options: {
            option1: { text: "No", points: [{ sociologist: "Karl Marx" }, { sociologist: "Herbert Spencer" }] },
            option2: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] }
        }
    },
    {
        id: '2',
        question: "¿Qué es más importante para el desarrollo de Honduras?",
        options: {
            option1: { text: "Tradiciones familiares", points: [{ sociologist: "Émile Durkheim" }, { sociologist: "Max Weber" }] },
            option2: { text: "Innovación tecnológica", points: [{ sociologist: "August Comte" }, { sociologist: "Herbert Spencer" }] }
        }
    },
    {
        id: '3',
        question: "¿Piensa que la globalización es una amenaza para la cultura hondureña?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Karl Marx" }] },
            option2: { text: "No", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '4',
        question: "¿Cuál debería ser la prioridad del gobierno?",
        options: {
            option1: { text: "Equidad social", points: [{ sociologist: "Karl Marx" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "Desarrollo económico", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '5',
        question: "¿Piensa que las tradiciones culturales deben ser preservadas a toda costa?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "No", points: [{ sociologist: "Karl Marx" }, { sociologist: "Herbert Spencer" }] }
        }
    },
    {
        id: '6',
        question: "¿Qué debería ser el foco principal de la educación en Honduras?",
        options: {
            option1: { text: "Valores y tradiciones", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "Ciencias y tecnología", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '7',
        question: "¿Cree que el sistema educativo en Honduras debería enfocarse más en las ciencias y la tecnología?",
        options: {
            option1: { text: "No", points: [{ sociologist: "Émile Durkheim" }, { sociologist: "Max Weber" }] },
            option2: { text: "Sí", points: [{ sociologist: "August Comte" }, { sociologist: "Herbert Spencer" }] }
        }
    },
    {
        id: '8',
        question: "¿Considera que el papel del gobierno es crucial para mejorar las condiciones sociales en Honduras?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Karl Marx" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "No", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "Max Weber" }] }
        }
    },
    {
        id: '9',
        question: "¿Piensa que las tradiciones culturales de Honduras obstaculizan el desarrollo económico?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Karl Marx" }, { sociologist: "August Comte" }] },
            option2: { text: "No", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] }
        }
    },
    {
        id: '10',
        question: "¿Cuál es la clave para el progreso de Honduras?",
        options: {
            option1: { text: "Solidaridad y cohesión social", points: [{ sociologist: "Émile Durkheim" }, { sociologist: "Max Weber" }] },
            option2: { text: "Innovación y adaptación", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '11',
        question: "¿Considera que el mercado libre es la mejor solución para los problemas económicos de Honduras?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] },
            option2: { text: "No", points: [{ sociologist: "Karl Marx" }, { sociologist: "Max Weber" }] }
        }
    },
    {
        id: '12',
        question: "¿Piensa que la evolución social es inevitable y que las sociedades deben adaptarse continuamente?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] },
            option2: { text: "No", points: [{ sociologist: "Émile Durkheim" }, { sociologist: "Karl Marx" }] }
        }
    },
    {
        id: '13',
        question: "¿Cree que la religión debe ser una parte central en la educación de los jóvenes en Honduras?",
        options: {
            option1: { text: "No", points: [{ sociologist: "Karl Marx" }, { sociologist: "Herbert Spencer" }] },
            option2: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] }
        }
    },
    {
        id: '14',
        question: "¿Considera que las reformas políticas pueden mejorar significativamente la calidad de vida en Honduras?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Karl Marx" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "No", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "Max Weber" }] }
        }
    },
    {
        id: '15',
        question: "¿Cree que la influencia de la cultura indígena debería ser promovida en Honduras?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "No", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '16',
        question: "¿Qué considera más dañino para el desarrollo de Honduras?",
        options: {
            option1: { text: "La corrupción política", points: [{ sociologist: "Karl Marx" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "La falta de inversión extranjera", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '17',
        question: "¿Cree que la educación debería incluir más estudios sobre la historia y cultura hondureña?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Max Weber" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "No", points: [{ sociologist: "August Comte" }, { sociologist: "Herbert Spencer" }] }
        }
    },
    {
        id: '18',
        question: "¿Piensa que las políticas neoliberales son beneficiosas para Honduras?",
        options: {
            option1: { text: "No", points: [{ sociologist: "Karl Marx" }, { sociologist: "Émile Durkheim" }] },
            option2: { text: "Sí", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "August Comte" }] }
        }
    },
    {
        id: '19',
        question: "¿Cree que la emigración masiva es un problema grave para Honduras?",
        options: {
            option1: { text: "Sí", points: [{ sociologist: "Émile Durkheim" }, { sociologist: "Karl Marx" }] },
            option2: { text: "No", points: [{ sociologist: "Herbert Spencer" }, { sociologist: "Max Weber" }] }
        }
    }
];
