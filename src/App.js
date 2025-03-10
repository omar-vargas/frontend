import { useState } from "react";
import axios from "axios";
import "./App.css";  // Importamos el archivo CSS

function App() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [frase, setFrase] = useState("");
    const [autor, setAutor] = useState("");

    const API_URL = "http://localhost:5000/api/checkin";

    // Lista de empleados
    const empleados = [
        "AGUIRRE MARROQUÍN ALBERTO",
        "ARIAS PARGA DEYSI",
        "BOHÓRQUEZ HERNÁNDEZ MARLON AUGUSTO",
        "CAMARGO MAYORGA RAMIRO",
        "CANO AMAYA LIBETH ASTRID",
        "CHIMBÍ BARATO RAÚL STEVEN",
        "CONTRERAS ARÉVALO DIANA PAOLA",
        "CUBIDES LUGO CONSTANZA",
        "DÍAZ MONROY EDGAR NIVEY",
        "ESCOBAR PINTO CLAUDIA VICTORIA",
        "FORERO FORERO WILLIAM DARIO",
        "GARCÍA RIOJA ROBINSON ANDRÉS",
        "HERNÁNDEZ CABALLERO FRANCI XIMENA",
        "HERNÁNDEZ DUEÑAS LEAR HEMIR",
        "HERRERA HERRERA LEIDY LORENA",
        "LADINO CERÓN GUSTAVO",
        "LEÓN CABALLERO OSWALDO",
        "LÓPEZ HERRERA VILMA AMPARO",
        "LOZANO GARCÍA LUIS STEVEN",
        "MONCADA PADILLA KARIN MIRIAM",
        "MONCAYO JURADO LILIANNA AMPARO",
        "QUEVEDO FAJARDO MEIBEL DANEYSE",
        "REYES GÓMEZ ANGELA MARÍA DEL PILAR",
        "ROCHA ENCISO DANILO ANDRÉS",
        "ROMERO JIMÉNEZ EDNA ROCÍO",
        "SOLORZANO PERALTA NORMA CONSTANZA",
        "TAVERA WILCHES MARYEN IGNACIA",
        "TOVAR LEÓN HEYLER YEDIR",
        "VILLARREAL ÁLVAREZ JORGE ANDRÉS"
    ];

    const handleCheckIn = async () => {
        if (!nombre) {
            alert("Por favor seleccione su nombre");
            return;
        }

        try {
            const res = await axios.post(API_URL, { nombre });
            if (res.data.registrado) {
                setMensaje(`Ya te habías registrado hoy a las ${res.data.hora}`);
            } else {
                setMensaje(`Te has registrado correctamente a las ${res.data.hora}`);
                setFrase(res.data.frase.frase);
                setAutor(res.data.frase.autor);
            }
            setNombre(""); // Limpiar selección
        } catch (error) {
            console.error("Error al registrar", error);
            setMensaje("Ocurrió un error al registrar. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="container">
            <h1>📅 Registro de Hora de Llegada</h1>
            <select
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="select-empleado"
            >
                <option value="">Seleccione su nombre</option>
                {empleados.map((empleado, index) => (
                    <option key={index} value={empleado}>{empleado}</option>
                ))}
            </select>
            <button onClick={handleCheckIn} className="btn-registrar">Registrar</button>

            {mensaje && (
                <div className="mensaje">
                    <p>{mensaje}</p>
                    {frase && <p>"{frase}"</p>}
                    {autor && <p className="autor">- {autor}</p>}
                </div>
            )}
        </div>
    );
}

export default App;
