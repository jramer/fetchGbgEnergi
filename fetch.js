//==============================================================================
// Casper generated Sat Jan 26 2013 17:14:26 GMT+0100 (CET)
//==============================================================================

var x = require('casper').selectXPath;
var energiLank;
var casper = require('casper').create(
{
	clientScripts: ["jquery-1.9.0.min.js"]
    //verbose: true,
    //logLevel: "debug"
}
);
phantom.cookiesEnabled = true;
if(!(casper.cli.has(0) && casper.cli.has(1) && casper.cli.has('anlid'))) {
	casper.echo("\nAnge anläggningsid, användarnamn och lösenord som argument till scriptet.\nEx. casperjs fetch.js namn lösen --anlid=1234567890\n\nFick:\n"+casper.cli.get(0)+"\n"+casper.cli.get(1)+"\n"+casper.cli.raw.get('anlid')).exit();
}
var anlId = casper.cli.raw.get('anlid');//Får inte hela anlid med bara enkel get...
var anvNamn = casper.cli.get(0);
var losenord = casper.cli.get(1);
var now = new Date();
var startDag = now.getDate() -1;
var viewstate;
var ctl00$cphBody$ScriptManager1;
var eventvalidation;
var ctl00$cphBody$txtSessionTimeOut;
var ctl00$cphBody$ucYearPicker$txtYear;

casper.options.viewportSize = {width: 1280, height: 673};
casper.start('https://gbgc.goteborgenergi.se/main/default.asp');
casper.waitForSelector("form[name=frm] input[name='CustId']",
    function success() {
        this.test.assertExists("form[name=frm] input[name='CustId']", "Loginformulär");
        this.click("form[name=frm] input[name='CustId']");
    },
    function fail() {
        this.test.assertExists("form[name=frm] input[name='CustId']");
});
casper.waitForSelector("form[name=frm]",
    function success() {
        this.fill("form[name=frm]", {"CustId": anvNamn});
		this.fill("form[name=frm]", {"pwd": losenord});
    },
    function fail() {
        this.test.assertExists("form[name=frm]");
});
casper.waitForSelector("form[name=frm] input[type=submit][value='Logga in']",
    function success() {
        this.test.assertExists("form[name=frm] input[type=submit][value='Logga in']", "Logga in");
        this.click("form[name=frm] input[type=submit][value='Logga in']");
    },
    function fail() {
        this.test.assertExists("form[name=frm] input[type=submit][value='Logga in']");
});
// submit form
casper.wait(1000);
casper.waitForSelector(x("//a[normalize-space(text())='Tjänster']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Tjänster']"), "Länk tjänster");
        this.click(x("//a[normalize-space(text())='Tjänster']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Tjänster']"));
});
casper.waitForSelector(x("//a[normalize-space(text())='Din elanvändning']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Din elanvändning']"), "Länk elanvändning");
        this.click(x("//a[normalize-space(text())='Din elanvändning']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Din elanvändning']"));
});
//Hitta länken
casper.then(function() {
	energiLank = this.getElementAttribute("a[target='StatisticsWin']", "href");
    this.echo("LÄNK: " + energiLank);
	casper.open(energiLank);
});
casper.waitForSelector(x("//a[normalize-space(text())='"+ anlId +"']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='"+ anlId +"']"), "Anläggningen finns");
        this.click(x("//a[normalize-space(text())='"+ anlId +"']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='"+ anlId +"']"));
});
casper.waitForSelector("#cphBody_lbDay",
    function success() {
        this.test.assertExists("#cphBody_lbDay");
		viewstate = this.evaluate(function() {
			return $('input[name="__VIEWSTATE"]').val();
		});
		eventvalidation = this.evaluate(function() {
			return $('input[name="__EVENTVALIDATION"]').val();
		});
		ctl00$cphBody$ScriptManager1 = this.evaluate(function() {
			return $('input[name="ctl00$cphBody$ScriptManager1"]').val();
		});
		ctl00$cphBody$txtSessionTimeOut = this.evaluate(function() {
			return $('input[name="ctl00$cphBody$txtSessionTimeOut"]').val();
		});
		ctl00$cphBody$ucYearPicker$txtYear = this.evaluate(function() {
			return $('input[name="ctl00$cphBody$ucYearPicker$txtYear"]').val();
		});
		//this.echo('__EVENTVALIDATION'+eventvalidation);
		//this.echo('ctl00$cphBody$ScriptManager1 '+ctl00$cphBody$ScriptManager1);
		//this.echo('ctl00$cphBody$txtSessionTimeOut '+ctl00$cphBody$txtSessionTimeOut);
		//this.echo('ctl00$cphBody$ucYearPicker$txtYear '+ctl00$cphBody$ucYearPicker$txtYear);
		var url_now = this.getCurrentUrl();
		this.echo("Försöker posta mot url: "+url_now);
		this.evaluate(function(url) {
			$.ajax({
				url: url_now,
				type: 'POST',
				data: { 
						'__EVENTTARGET': 'ctl00%24cphBody%24lbDay',  
						'__EVENTARGUMENT': '', 
						'__VIEWSTATE': viewstate, 
						'__EVENTVALIDATION': eventvalidation, 
						'ctl00$cphBody$ucYearPicker$txtYear': ctl00$cphBody$ucYearPicker$txtYear,
						'ctl00$cphBody$txtSessionTimeOut': ctl00$cphBody$txtSessionTimeOut, 
						'ctl00$cphBody$ScriptManager1': 'ctl00%24cphBody%24pnlUpdatePanel%7Cctl00%24cphBody%24lbDay', 
						'__ASYNCPOST': 'true'
						}
			}).done(function(data){__utils__.echo(data);})
			.fail(function() { __utils__.echo("error"); })
			.always(function() { __utils__.echo("finished"); });;
		}, url_now);
		this.wait(5000);
    },
    function fail() {
        this.test.assertExists("#cphBody_lbDay");
});
casper.wait(5000);
casper.waitForSelector("#cphBody_UcDailyPicker_lnkDay"+(startDag+1),
    function success() {
        this.test.assertExists("#cphBody_UcDailyPicker_lnkDay"+(startDag+1));
        this.click("#cphBody_UcDailyPicker_lnkDay"+(startDag+1));
    },
    function fail() {
        this.test.assertExists("#cphBody_UcDailyPicker_lnkDay"+(startDag+1));
});
casper.wait(1000);
casper.then(function() {
	this.echo("År: " + this.getElementAttribute('#cphBody_ucYearPicker_txtYear', 'value'));
	this.echo("Förbrukning: " + this.fetchText('#cphBody_ReadingsGridView'));
    this.captureSelector("screenshot1.png", "html");
});

casper.run(function() {this.test.renderResults(true);});