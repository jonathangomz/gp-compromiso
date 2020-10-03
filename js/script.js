window.onload = function () {
  let modal = configureModal({
    close: document.getElementsByClassName("button close")[0],
    modal: document.getElementById('modal')
  });
  
  const inputs = document.getElementsByTagName('input');
  for (const input of inputs) {
    input.onfocus = function (evt) {
      removeClassInvalid(evt.target);
    }

    input.onblur = function (evt) {
      const value = evt.target.value;
      if (!isValidValue(value))
        addClassInvalid(evt.target);
    }
  }

  const form = document.getElementById('generate-commitment');
  form.onsubmit = function (evt) {
    evt.preventDefault();
    
    const button = document.getElementById('generate');
    button.setAttribute('disabled', 'true');
    button.setAttribute('class', 'disabled');
    button.textContent = 'Generando...';

    const {
      values,
      valid
    } = validateAndExtractData();
    if (valid) {
      generatePDF(values);
      
      modal.display('El documento fue descargado o está listo para descargar');
      button.removeAttribute('disabled');
      button.removeAttribute('class');
      button.textContent = 'Generar & descargar PDF';
    }
    else {
      modal.display('Hacen falta de rellenar los campos en rojo');
      button.removeAttribute('disabled');
      button.removeAttribute('class');
      button.textContent = 'Generar & descargar PDF';
    }
  }


  function configureModal({close, modal}) {
    // When the user clicks on <span> (x), close the modal
    modal.close = close.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.display = function(message) {
        modal.style.display = "block";
        document.getElementById('modal-text').innerHTML = message ?? "This modal is empty hehe";
    }

    return modal;
  }

  function validateAndExtractData() {
    const fields = {
      leader: document.getElementById('leader'),
      gp: document.getElementById('gp'),
      church: document.getElementById('church'),
      district: document.getElementById('district'),
      objective: document.getElementById('objective'),
    }

    const pdf_values = {
      values: {
        leader: fields.leader.value,
        gp: fields.gp.value,
        church: fields.church.value,
        district: fields.district.value,
        objective: fields.objective.value,
      },
      valid: true,
    }

    for (const key in pdf_values.values) {
      if (!isValidValue(pdf_values.values[key])) {
        addClassInvalid(fields[key]);
        pdf_values.valid = false;
      } else
        continue;
    }

    return pdf_values;
  }

  function isValidValue(field) {
    let tmp_field = field;
    if (!tmp_field) return false;

    tmp_field = tmp_field.trim();
    if (tmp_field === 0) return false;

    return true;
  }

  function addClassInvalid(field) {
    const label = document.querySelector(`label[for=${field.id}]`);
    field.classList.add('invalid');
    label.classList.add('invalid');
  }

  function removeClassInvalid(field) {
    const label = document.querySelector(`label[for=${field.id}]`);
    field.classList.remove('invalid');
    label.classList.remove('invalid');
  }

  function generatePDF({
    leader,
    gp,
    church,
    district,
    objective
  }) {
    var doc = new jsPDF();
    
    doc.setFont('times');
    doc.setFontSize(24);
    doc.setFontType("bold");
    doc.text("MI COMPROMISO CON CRISTO", 110, 35, 'center');
    
    doc.setFontSize(16);
    doc.setFontType("bold");
    doc.text('Nombre del lider:', 20, 55);
    doc.setFontType("normal");
    doc.text(leader, 65, 55);
    
    doc.setFontType("bold");
    doc.text('GP:', 20, 65);
    doc.setFontType("normal");
    doc.text(gp, 31, 65);
    
    doc.setFontType("bold");
    doc.text('Iglesia:', 20, 75);
    doc.setFontType("normal");
    doc.text(church, 39, 75);
    
    doc.setFontType("bold");
    doc.text('Distrito:', 20, 85);
    doc.setFontType("normal");
    doc.text(district, 42, 85);
    
    doc.setFontType("bold");
    doc.text('Objetivo bautismal 2021:', 20, 95);
    doc.setFontType("normal");
    doc.text(objective, 82, 95);
    
    const img = document.getElementById('logo');
    doc.addImage(img, 'PNG', 58, 110, 100, 120, compression = 'FAST');
    

    window.open(doc.output('bloburl', 'compromiso.pdf'));
  }
}