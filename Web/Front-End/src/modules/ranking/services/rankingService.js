const rankingData = [

    {
        id: 1,
        position: 1,
        name: "Ambiente 209-1",
        location: "Bloque A",
        score: 98,
        status: "Normal",
        temperature: "22°C",
        humidity: "48%",
        co2: "640 ppm",
        noise: "31 dB"
    },

    {
        id: 2,
        position: 2,
        name: "Ambiente 209-2",
        location: "Bloque A",
        score: 95,
        status: "Normal",
        temperature: "23°C",
        humidity: "50%",
        co2: "670 ppm",
        noise: "33 dB"
    },

    {
        id: 3,
        position: 3,
        name: "Ambiente 209-3",
        location: "Bloque A",
        score: 92,
        status: "Normal",
        temperature: "24°C",
        humidity: "52%",
        co2: "690 ppm",
        noise: "36 dB"
    },


];

export async function getRanking(){

    return new Promise(resolve=>{

        setTimeout(()=>{

            resolve(rankingData);

        },500);

    });

}