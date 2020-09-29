window.onload = function () {
  const form = document.getElementById('generate-commitment');
  form.onsubmit = function (evt) {
    evt.preventDefault();

    const {
      leader,
      gp,
      church,
      district,
      objective
    } = extractData();
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("MI COMPROMISO CON CRISTO", 110, 35, 'center');
    doc.setFontSize(16);
    doc.text(`Nombre del lider: ${leader}`, 20, 65);
    doc.text(`GP: ${gp}`, 20, 75);
    doc.text(`Iglesia: ${church}`, 20, 85);
    doc.text(`Distrito: ${district}`, 20, 95);
    doc.text(`Objetivo bautismal 2021: ${objective}`, 20, 105);

    doc.save();
  }

  function extractData() {
    const leader = document.getElementById('leader').value;
    const gp = document.getElementById('gp').value;
    const church = document.getElementById('church').value;
    const district = document.getElementById('district').value;
    const objective = document.getElementById('objective').value;

    return {
      leader,
      gp,
      church,
      district,
      objective,
    }
  }
}