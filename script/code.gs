function doGet(e) {
  let params = e.parameter;
  to_do(params["form_url"], params["name"]);
  return HtmlService
      .createTemplateFromFile("return")
      .evaluate();
}


function to_do(form_url, to_who) {
  let form = FormApp.openByUrl(form_url);
  let formResponses = form.getResponses();
  let subject = form.getTitle()

  let template = HtmlService.createTemplateFromFile('mail_template');

  titles = [];
  formResponses[0].getItemResponses().forEach( item => {
    titles.push(item.getItem().getTitle());
  });
  template.titles = titles;

  template.responses = formResponses;
  let html = template.evaluate().getContent();
  MailApp.sendEmail(to_who, subject, html, {htmlBody: html});
}
