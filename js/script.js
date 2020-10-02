window.onload = function () {
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

    const {
      values,
      valid
    } = validateAndExtractData();
    if (valid)
      generatePDF(values);
    else
      alert('Hacen falta de rellenar los campos en rojo');
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

    html2canvas(document.body, {
      onrendered: function (canvas) {
        var img = canvas.toDataURL();
        var doc = new jsPDF();
        doc.addImage(canvas, 'PNG', 20, 20);
        
        doc.setFontSize(24);
        doc.text("MI COMPROMISO CON CRISTO", 110, 35, 'center');
        doc.setFontSize(16);
        doc.text(`Nombre del lider: ${leader}`, 20, 65);
        doc.text(`GP: ${gp}`, 20, 75);
        doc.text(`Iglesia: ${church}`, 20, 85);
        doc.text(`Distrito: ${district}`, 20, 95);
        doc.text(`Objetivo bautismal 2021: ${objective}`, 20, 105);
        
        doc.save('compromiso.pdf');
      }
    });
    
  }
}