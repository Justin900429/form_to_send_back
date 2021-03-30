function doGet(e) {
  let params = e.parameter;
  to_do(params["form_url"], params["name"]);
  let return_template = HtmlService.createTemplateFromFile('return');
  let return_html = return_template.evaluate().getContent();
  return HtmlService.createHtmlOutput(return_html);
}


function to_do(form_url, to_who) {
  let form = FormApp.openByUrl(form_url);
  let formResponses = form.getResponses();  

  let template = HtmlService.createTemplateFromFile('mail_template');

  titles = [];
  formResponses[1].getItemResponses().forEach( item => {
    titles.push(item.getItem().getTitle());
  });
  template.titles = titles;

  template.responses = formResponses;
  let html = template.evaluate().getContent();
  MailApp.sendEmail(to_who, "Test", html, {htmlBody: html});
}

