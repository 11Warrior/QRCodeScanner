
function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        console.log("You Qr is : " + decodeText, decodeResult);
        showAlert(decodeText);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "scan",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

// function to create alert on the screen 
function showAlert(yourLink) {
    //main container
    const maindiv = document.createElement("div");
    maindiv.style.position = "fixed";
    maindiv.style.width = "100%";
    maindiv.style.height = "100%";
    maindiv.style.background = "white";
    maindiv.style.display = "flex";
    maindiv.style.alignItems = "center";
    maindiv.style.justifyContent = "center";

    //content box
    const contentdiv = document.createElement("div");
    contentdiv.backgrounColor = "white";
    contentdiv.style.boxShadow = "0 4px 10px rbga(0, 0, 0, 0.2)";
    contentdiv.style.paddding = "25px";
    maindiv.style.textAlign = "center";

    //alert msg
    const txt = document.createElement("p");
    txt.textContent = `Successfully scanned you QR code... \nHere is your lnk: ${yourLink}`;
    txt.style.marginBottom = "15px";
    contentdiv.appendChild(txt);

    //button
    const alertButton = document.createElement("button");
    alertButton.textContent = "Go to your link !";
    alertButton.style.padding = "10px 20px";
    alertButton.style.backgroundColor = "#DE3163";
    alertButton.style.color = "white";
    alertButton.style.border = "none";
    alertButton.style.borderRadius = "5px";
    alertButton.style.cursor = "pointer";

    alertButton.onclick = () => {
        window.open(yourLink, "_blank");
        document.body.removeChild(maindiv);
    };

    contentdiv.appendChild(alertButton);

    maindiv.appendChild(contentdiv);

    document.body.appendChild(maindiv);

}