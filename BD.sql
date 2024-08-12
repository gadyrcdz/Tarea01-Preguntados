use preguntas;

CREATE TABLE IF NOT EXISTS pregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuestaM1 VARCHAR(255) NOT NULL,
    respuestaM2 VARCHAR(255) NOT NULL,
    respuestaB VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    aciertos INT NOT NULL
);

INSERT INTO pregunta (pregunta, respuestaM1, respuestaM2, respuestaB) VALUES
('¿Cuál es la capital de Francia?', 'Londres', 'Berlín', 'París'),
('¿Cuál es el elemento químico con el símbolo O?', 'Osmio', 'Oro', 'Oxígeno'),
('¿En qué año llegó el hombre a la luna?', '1965', '1969', '1972'),
('¿Cuál es el planeta más grande del sistema solar?', 'Tierra', 'Marte', 'Júpiter'),
('¿Quién escribió "Cien años de soledad"?', 'Mario Vargas Llosa', 'Gabriel García Márquez', 'Jorge Luis Borges'),
('¿Cuál es el río más largo del mundo?', 'Amazonas', 'Nilo', 'Yangtsé'),
('¿Cuál es la moneda oficial de Japón?', 'Won', 'Yuan', 'Yen'),
('¿Qué país es conocido como la tierra del sol naciente?', 'China', 'Corea', 'Japón'),
('¿En qué continente se encuentra Egipto?', 'Asia', 'África', 'Europa'),
('¿Qué es la fotosíntesis?', 'Proceso de respiración', 'Proceso de digestión', 'Proceso de conversión de luz en energía química'),
('¿Cuál es la capital de España?', 'Barcelona', 'Madrid', 'Sevilla'),
('¿Qué vitamina se obtiene principalmente del sol?', 'Vitamina B12', 'Vitamina C', 'Vitamina D'),
('¿Cuál es el idioma oficial de Brasil?', 'Español', 'Portugués', 'Inglés'),
('¿Cuál es la montaña más alta del mundo?', 'K2', 'Everest', 'Makalu'),
('¿Quién pintó la Mona Lisa?', 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci'),
('¿Cuál es el océano más grande?', 'Atlántico', 'Íntico', 'Pacífico'),
('¿Qué día se celebra el Día de la Independencia de Estados Unidos?', '4 de julio', '14 de julio', '1 de enero'),
('¿Cuál es el planeta más cercano al sol?', 'Venus', 'Marte', 'Mercurio'),
('¿Quién es el autor de "Don Quijote de la Mancha"?', 'Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'),
('¿Cuál es la capital de Italia?', 'Roma', 'Venecia', 'Milán');

