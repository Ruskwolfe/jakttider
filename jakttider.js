// Data-definisjoner
const jakttiderFugler = {
    toppskarv: "01.10. til 30.11. i Finnmark, Troms, Nordland og Nord-Trøndelag, samt spesifikke kommuner i Sør-Trøndelag",
    storskarv: "01.10. til 30.11. over hele landet med unntak \nUngfugl med hvit buk: 01.10. til 30.11. i Møre og Romsdal og Sør-Trøndelag (unntatt visse kommuner) \nStorskarv i ferskvann: 21.08. til 23.12. i Østfold, Akershus, Buskerud, Vestfold, Telemark, Aust-Agder, Vest-Agder og Rogaland",
    kortnebbgås: "10.08. til 23.12. generelt, med regionale begrensninger",
    grågås: "10.08. til 23.12. med spesifikke begrensninger i Finnmark og varierte datoer i andre områder",
    brunnakke: "21.08. til 23.12. over hele landet",
    krikkand: "21.08. til 23.12. over hele landet",
    stokkand: "21.08. til 23.12. over hele landet",
    toppand: "10.09. til 23.12. over hele landet",
    havelle: "10.09. til 23.12. over hele landet",
    kvinand: "10.09. til 23.12. over hele landet",
    siland: "10.09. til 23.12. over hele landet",
    laksand: "10.09. til 23.12. over hele landet",
    svartand: "10.09. til 23.12. i Østfold, Akershus, Oslo, Vestfold, Buskerud, Telemark, Aust-Agder, Vest-Agder",
    ærfugl: "01.10. til 30.11. i Østfold, Vestfold, Buskerud, Telemark, Aust-Agder, Vest-Agder",
    jerpe: "10.09. til 23.12. over hele landet",
    orrfugl: "10.09. til 23.12. over hele landet",
    storfugl: "10.09. til 23.12. over hele landet",
    lirype: "10.09. til 28.02./29.02. over hele landet, med utvidelse til 15.03. i noen nordlige områder",
    fjellrype: "10.09. til 28.02./29.02. over hele landet, med utvidelse til 15.03. i noen nordlige områder",
    heilo: "21.08. til 31.10. over hele landet, unntatt Rogaland hvor arten er fredet",
    enkeltbekkasin: "21.08. til 31.10. over hele landet",
    rugde: "10.09. til 23.12. over hele landet",
    gråmåke: "21.08. til 28.02./29.02. over hele landet",
    svartbak: "21.08. til 28.02./29.02. over hele landet",
    ringdue: "21.08. til 23.12. over hele landet, unntatt Troms og Finnmark hvor arten er fredet",
    gråtrost: "10.08. til 23.12. over hele landet",
    rødvingetrost: "10.08. til 23.12. over hele landet",
    nøtteskrike: "10.08. til 28.02./29.02. over hele landet, unntatt i Nordland, Troms, og Finnmark hvor arten er fredet",
    skjære: "10.08. til 28.02./29.02. over hele landet",
    kråke: "15.07. til 31.03. over hele landet",
    ravn: "10.08. til 28.02./29.02. over hele landet",
};

// Funksjonsdefinisjoner

// Viser en liste over alle tilgjengelige arter
// Function to display available species
function visTilgjengeligeArter() {
    const resultaterDiv = document.getElementById('resultater');
    resultaterDiv.innerHTML = '<strong>Tilgjengelige arter for jakttider:</strong><br>';
    Object.keys(jakttiderFugler).sort().forEach(art => {
        const artNavn = art.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        resultaterDiv.innerHTML += `${artNavn}<br>`;
    });
}

function finnNaermesteArter(inputArt, tilgjengeligeArter) {
    inputArt = inputArt.toLowerCase();

    // First, check for direct substring matches
    let directMatches = tilgjengeligeArter.filter(art =>
        art.toLowerCase().includes(inputArt)
    );
    if (directMatches.length > 0) {
        return directMatches.slice(0, 3); // Up to 3 direct matches
    }

    // If no direct matches, proceed with position-based matching
    let maxMatchCount = 0;
    let naermesteArter = [];
    tilgjengeligeArter.forEach(art => {
        let matchCount = 0;
        for (let i = 0; i < Math.min(art.length, inputArt.length); i++) {
            if (art[i] === inputArt[i]) matchCount++;
        }
        if (matchCount > maxMatchCount) {
            maxMatchCount = matchCount;
            naermesteArter = [art];
        } else if (matchCount === maxMatchCount) {
            naermesteArter.push(art);
        }
    });

    return naermesteArter.slice(0, 3); // Return the closest matches
}

// Main function to check hunting times based on user input
function sjekkJakttider() {
    console.log('Sjekker jakttider...');
    const inputArt = document.getElementById('artInput').value.toLowerCase().replace(/\s+/g, '_');
    const resultaterDiv = document.getElementById('resultater');

    if (inputArt.trim() === '') {
        resultaterDiv.innerHTML = "Du må faktisk skrive noe.";
        return;
    }

    resultaterDiv.innerHTML = ''; 

    if (inputArt === 'liste') {
        visTilgjengeligeArter();
        return;
    }

    const tilgjengeligeArter = Object.keys(jakttiderFugler);
    if (jakttiderFugler[inputArt]) {
        const artNavn = inputArt.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        resultaterDiv.innerHTML = `Jakttider for ${artNavn}: ${jakttiderFugler[art]}`;
        return; // Exit the function early if a direct match is found
    }

    const naermesteArter = finnNaermesteArter(inputArt, tilgjengeligeArter);
    if (naermesteArter.length > 0) {
        for (let i = 0; i < naermesteArter.length; i++) { // Using a for loop allows for an early return
            const artNavn = naermesteArter[i].replace('_', ' ').charAt(0).toUpperCase() + naermesteArter[i].slice(1).replace('_', ' ');
            const userConfirmed = confirm(`Mente du ${artNavn}?`);
            if (userConfirmed) {
                const formattedName = artNavn.replace('_', ' ');
                resultaterDiv.innerHTML = `Jakttider for ${formattedName}: ${jakttiderFugler[naermesteArter[i]]}`;
                return; // Exit the function once a suggestion is confirmed
            }
        }
        alert("Ingen forslag ble bekreftet. Vennligst prøv igjen.");
    } else {
        resultaterDiv.innerHTML = "Kunne ikke finne en passende art. Vennligst skriv noe mer spesifikt.";
    }
}

// Add event listeners once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('jakttider').addEventListener('click', sjekkJakttider);
});