function doGet(e) {
  let params = e.parameter;
  to_do(params["form_url"], params["name"]);
  let return_template = HtmlService.createTemplateFromFile('return');
  let return_html = return_template.evaluate().getContent();
  return HtmlService.createHtmlOutput(
    "<form action='http://justin900429.github.io/form_to_send_back/return.html' method='get' id='foo'></form>" +
    "<script>document.getElementById('foo').submit();</script>");
}


function to_do(form_url, to_who) {
  let form = FormApp.openByUrl(form_url);
  let formResponses = form.getResponses();
  let subject = form.getTitle()

  let template = HtmlService.createTemplateFromFile('mail_template');

  titles = [];
  formResponses[1].getItemResponses().forEach( item => {
    titles.push(item.getItem().getTitle());
  });
  template.titles = titles;

  template.responses = formResponses;
  let html = template.evaluate().getContent();
  MailApp.sendEmail(to_who, subject, html, {htmlBody: html});
}
