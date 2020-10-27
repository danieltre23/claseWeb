async function fetchSections(){
  let retData = null;
  await fetch('/getSections')
    .then(response => {
      return response.json();
    })
    .then(data => {
      retData = data;
    })
    .catch(error => {
      console.log(error);
    })
  retData.forEach(section => {
    section.subssections = [];
  });
  await fetch('/getSubsections')
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(subsection => {
        retData.filter(s => s.id == subsection.id_section)[0].subssections.push(subsection);
      })
    })
    .catch(error => {
      console.log(error);
    })
  return retData;
}

async function fetchImgs(){
  let imgs = [];
  await fetch('/getImgs')
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(img => {
        imgs.push("./fotos/"+img.img);
      })
    })
    .catch(error => {
      console.log(error);
    })
  return imgs;
}