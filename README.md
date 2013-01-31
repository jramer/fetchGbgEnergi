fetchGbgEnergi
==============

Hämtar energiförbrukning från Göteborgs Energi mha PhantomJS + CasperJS.

Körs genom:
~~~~
casperjs fetch.js anvNamn lösenord --anlid=01234567890
~~~~
=======
Problem:
~~~~

//<![CDATA[
var theForm = document.forms['form1'];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
~~~~
