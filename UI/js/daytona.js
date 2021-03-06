function buildTopNavBar(framework, testid, userId) {

  var topSideNavBar = $("#top-side-nav");
  var searchLi = $("<li></li>");
  var searchlink = $("<a></a>").text("Search")
                  .attr("href", "/search.php?framework=" + framework)
                  .prepend($("<i></i>").addClass("fa fa-search"));
  $(searchLi).append(searchlink);
  $(topSideNavBar).append(searchLi);

  var navBar = $("#top-nav-bar");

  var breadcrumbBar = $("<div></div>").addClass("col-sm-6");
  $(breadcrumbBar).attr('id','breadcrumb-div');
  $(navBar).append(breadcrumbBar);
  
  var navUl = $("<ul></ul>").addClass("breadcrumb");
  $(navUl).attr('id','breadcrumb-list');
  
  var navTitleHome = $("<li></li>");
  if(framework === "Global") {
    $(navTitleHome).addClass("active");
  }
  
  var home = $("<a></a>").attr("href", "/").text("Home");
  $(navTitleHome).append(home);
  $(navUl).append(navTitleHome);

  if(framework !== "Global") {
    var navTitleFrameworkHome = $("<li></li>");
    if(!testid) {
      $(navTitleFrameworkHome).addClass("active");
    }
    var frameworkHome = $("<a></a>").text(framework)
      .attr("href", "/?framework=" + framework);
    $(navTitleFrameworkHome).append(frameworkHome);
    $(navUl).append(navTitleFrameworkHome);

    if(testid) {
      var navTitleTestidHome = $("<li></li>").addClass("active-label");
      var testidHome = $("<a></a>").attr("href", "/test_info.php?testid=" + testid)
        .text(testid);
      $(navTitleTestidHome).append(testidHome);
      $(navUl).append(navTitleTestidHome);
    }
  }

  var description = $("<li></li>").attr("id", "description");
  $(navUl).append(description);

  $(breadcrumbBar).append(navUl);

  var searchBar = $("<div></div>").addClass("col-sm-3");
  $(searchBar).attr('id','search-test-div');
  $(navBar).append(searchBar);

  var searchDiv = $("<div></div>").addClass("panel panel-success");
  $(searchDiv).attr('id','search-div');
  $(searchBar).append(searchDiv);

  var searchTest = $("<div></div>");
  $(searchTest).attr('id','search-test');
  $(searchDiv).append(searchTest);

  var inputGroup = $("<div></div>").addClass("input-group");
  $(inputGroup).attr('style','z-index:0');
  $(searchTest).append(inputGroup);

  var jumpTest = $("<input></input>").addClass("form-control")
  .attr("type", "text")
  .attr("placeholder", "Go to Test")
  .attr("id", "jump-test-input")
  .keydown(function(event) {
    if(event.keyCode == 13 && $("#jump-test-input").val()) {
    window.location = "/test_info.php?testid=" + $("#jump-test-input").val();
    }
    });
  $(inputGroup).append(jumpTest);

  var buttonSpan = $("<span></span>").addClass("input-group-btn");
  
  var jumpBtn = $("<button></button>").addClass("btn btn-info")
    .attr("type", "submit")
    .css("min-width", "initial")
    .click(function() {
        if($("#jump-test-input").val()) {
        window.location = "/test_info.php?testid=" + $("#jump-test-input").val();
        }
        });  
  var jumpBtnImg = $("<i></i>").addClass("fa fa-arrow-right")
                   .attr("style", "padding-right:0px;font-size:1.45em;");
  $(jumpBtn).append(jumpBtnImg);
  $(buttonSpan).append(jumpBtn);
  $(inputGroup).append(buttonSpan);

  var frameworkBar = $("<div></div>").addClass("col-sm-3");
  $(frameworkBar).attr('id','framework-dropdown-div');
  $(navBar).append(frameworkBar);

  var dropdownDiv = $("<div></div>").addClass("panel panel-success");
  $(dropdownDiv).attr('id','framework-div');
  $(frameworkBar).append(dropdownDiv);

  var frameworkDropdown = $("<div></div>");
  $(frameworkDropdown).attr('id','framework-dropdown');
  $(dropdownDiv).append(frameworkDropdown);
  
  var frameworkSelect = $("<select></select>").addClass("form-control");
  $(frameworkSelect).attr('id','framework-select')
  .append($("<option></option>")
  .text("Select Framework")); ;

  $(frameworkSelect).on('change', function () {
          var url = $(this).val(); // get selected value
          if (url) { // require a URL
              window.location = url; // redirect
          }
          return false;
  });

  $(frameworkDropdown).append(frameworkSelect);
}

function buildUserAccountMenu(userId){
  var topSideNavBar = $("#top-side-nav");
  var userAccountLi = $("<li></li>").addClass("has-children account");
  var userAccountUlLink = $("<a></a>").text(userId)
                  .attr("href", "#");
  var userIcon = $("<i></i>").addClass("fa fa-user");
  $(userAccountUlLink).prepend(userIcon);
  $(userAccountLi).append(userAccountUlLink);
  var userAccountUl = $("<ul></ul>");
  var userAccountSettingsLi = $("<li></li>");
  var userAccountSettingsLink = $("<a></a>").text(" Settings").attr("href", "/account.php");
  var SettingsIcon = $("<i></i>").addClass("fa fa-cogs");
  $(userAccountSettingsLink).prepend(SettingsIcon);
  $(userAccountSettingsLi).append(userAccountSettingsLink);
  $(userAccountUl).append(userAccountSettingsLi);
  var userAccountLogoutLi = $("<li></li>");
  var userAccountLogoutLink = $("<a></a>").text(" Logout").attr("href", "/login.php?logout=1")
  var logoutIcon = $("<i></i>").addClass("fa fa-sign-out");
  $(userAccountLogoutLink).prepend(logoutIcon);
  $(userAccountLogoutLi).append(userAccountLogoutLink);
  $(userAccountUl).append(userAccountLogoutLi);
  $(userAccountLi).append(userAccountUl);
  $(topSideNavBar).append(userAccountLi);
}

function setDescription(descText) {
  $("#description").text(descText);
}

function buildLeftPanel() {
 var navigationUl = $("#navigation-panel");
 var navigationLi = $("<li></li>").addClass("cd-label").text("Menu");
 $(navigationUl).append(navigationLi);
}

/*function toggleLeftPanel() {
  var leftPanel = $("#left-panel");
  var mainLeftValue = "0";
  var mainLeftAltValue = "35px";
  leftPanel.toggle();
  if(leftPanel.is(":visible")) {
    mainLeftValue = "220px";
    mainLeftAltValue = "220px";
    $(".toggle-panel-icon").addClass("fa-arrow-left").removeClass("fa-arrow-right");
  }
  else {
    $(".toggle-panel-icon").addClass("fa-arrow-right").removeClass("fa-arrow-left");
  }
  $("#main-panel").css("left", mainLeftValue);
  $("#main-panel-alt").css("left", mainLeftValue);
  $("#main-panel-alt-bottom").css("left", mainLeftAltValue);
  flushAllCharts();
}*/

function fillFrameworkDropDown(frameworkname, frameworkid) {
  var frameworkSelect = $("#framework-select");
  var frameworkOption = $("<option></option>");
  var frameworkA;
  if (frameworkid) {
    frameworkA = "/?frameworkid=" + frameworkid;
  } else {
    frameworkA = "/?framework=" + frameworkname;
  }
  $(frameworkOption).attr("value", frameworkA).text(frameworkname);

  $(frameworkSelect).append(frameworkOption);
}

/*function toggleTreeCollapse(referer) {
  $(referer).find("i").toggleClass("fa-plus-square fa-minus-square");
  $(referer).parent().find(".tree-collapse-panel").toggleClass("display-none");
}*/

function buildTreeRoot(title) {
  var treeRoot = $("<li></li>").addClass("has-children");
  var rootLink = $("<a></a>").attr("href", "#")
      .text(title);
  $(treeRoot).append(rootLink);
  return treeRoot;
}

function buildTreeCollapse(title) {
  var treeRoot = $("<li></li>").addClass("has-children");
  var rootLink = $("<a></a>").text(" " + title).attr("href", "#");
  var handIcon = $("<i></i>").addClass("fa fa-angleright")
                 .attr("aria-hidden","true");
  $(rootLink).append(handIcon);
  $(treeRoot).append(rootLink);

/*  if(isCollapsed) {
    $(collapsePanel).addClass("display-none");
  }
  var iconClass = isCollapsed ? "fa-plus-square" : "fa-minus-square";
  var titleLink = $("<a></a>").addClass("tree-title-link")
    .text(title)
    .attr("href", "#")
    .click(function() {
      toggleTreeCollapse(this);
    });
  $(titleLink).prepend($("<i></i>").addClass("fa " + iconClass));
  $(wrapperPanel).append(titleLink)
    .append(collapsePanel);
  return treeRoot;*/
}

function buildLeftPanelTest(frameworkid, owner) {
  var navigationUl = $("#navigation-panel");
  var testPanel = buildTreeRoot("Test");
  var testPanelList = $("<ul></ul>");
  
  var createLi = $('<li></li>');
  var createLink = $('<a></a>').text('Create')
    .attr('href', 'create_edit_test.php?action=create&frameworkid=' + frameworkid);
  $(createLi).append(createLink);
  $(testPanelList).append(createLi);

  var queueLi = $('<li></li>');
  var queueLink = $("<a></a>").text("Queue")
    .attr("id", "test-panel")
    .attr("href", "/?frameworkid=" + frameworkid);
  var queueBadge = $("<span></span>").addClass("badge queue-badge");
  $(queueLink).append(queueBadge);
  $(queueLi).append(queueLink);
  $(testPanelList).append(queueLi);

  var searchLi = $('<li></li>');
  var searchLink = $("<a></a>").text("Search")
    .attr("href", "search.php?frameworkid=" + frameworkid);
  $(searchLi).append(searchLink);
  $(testPanelList).append(searchLi);

  var myTestsLi = $('<li></li>');
  var myTestsLink = $("<a></a>").text("My Tests")
    .attr("href", "search.php?frameworkid=" + frameworkid + "&owner=" + owner);
  $(myTestsLi).append(myTestsLink);
  $(testPanelList).append(myTestsLi);

  $(testPanel).append(testPanelList);
  $(navigationUl).append(testPanel);

  window.frameworkid = frameworkid;
  queryQueueCount(window.frameworkid);
  setInterval(function() { queryQueueCount(window.frameworkid); }, 5000);
}

function buildLeftPanelViews(testid, compids) {
  var navigationUl = $("#navigation-panel");
  var viewPanel = buildTreeRoot("Views");
  var viewPanelList = $("<ul></ul>");

  var testInfoLi = $('<li></li>');
  var testInfoLink = $("<a></a>").text("Test Info & Status")
    .attr("href", "test_info.php?testid=" + testid + "&compids=" + compids);
  $(testInfoLi).append(testInfoLink);
  $(viewPanelList).append(testInfoLi);
 
  var editTestLi = $('<li></li>');
  var editTestLink = $("<a></a>").text("Edit Test")
    .attr("href", "create_edit_test.php?&action=edit&testid=" + testid);
  $(editTestLi).append(editTestLink);
  $(viewPanelList).append(editTestLi);

  var testReportLi = $('<li></li>');
  var testReportLink = $("<a></a>").text("Test Report")
    .attr("href", "test_report.php?testid=" + testid + "&compids=" + compids);
  $(testReportLi).append(testReportLink);
  $(viewPanelList).append(testReportLi);
  
  $(viewPanel).append(viewPanelList);
  $(navigationUl).append(viewPanel);
}

function buildLeftPanelOutput(show) {
  var navigationUl = $("#navigation-panel");
  var seperator = $("<hr>").attr("style", "margin-bottom:0px");
  $(navigationUl).append(seperator);
}

function createLabel(label){
  var navigationUl = $("#navigation-panel");
  var labelLi = $("<li></li>").addClass("cd-label").text(label);
  $(navigationUl).append(labelLi);
}

function fillTestResults(testid, compids, filename, path, hostid) {
  var extension = filename.replace(/^.*\./, '');
  var format;
  if (extension === "plt"){
    format = "graph";
  }else if (extension === "csv"){
    format = "table";
  }else{
    format = "plain";
  }
  var filepath = "%EXECHOST," + hostid + "%/" + filename;
  var testResults = $("#test-results-menu");
  var fileLinkLi = $("<li></li>");
  var fileLink = $("<a></a>").text(filename)
    .attr("href", "output.php?testid=" + testid + "&compids=" + compids +
      "&filename=" + filepath + "&format=" + format);
  $(fileLinkLi).append(fileLink);
  $(testResults).append(fileLinkLi);
}

function createTestResultsRoot() {
  var navigationUl = $("#navigation-panel");
  var outputFilesPanel = buildTreeRoot("Output Files");
  var outputFilesList = $("<ul></ul>").attr("id","test-results-menu");
  $(outputFilesPanel).append(outputFilesList)
  $(navigationUl).append(outputFilesPanel);
}

function fillSystemMetricsHost(host,hostid) {
  var navigationUl = $("#navigation-panel");
  var sysMetricsHostPanel = buildTreeRoot(host);
  var sysMetricsFilesList = $("<ul></ul>").attr("id","sys-metrics-menu" + hostid);
  $(sysMetricsHostPanel).append(sysMetricsFilesList);
  $(navigationUl).append(sysMetricsHostPanel);
}

function fillSystemMetrics(testid, compids, filename, path, hostid, label) {
    var extension = filename.replace(/^.*\./, '');
  var format;
  if (extension === "plt"){
    format = "graph";
  }else if (extension === "csv"){
    format = "table";
  }else{
    format = "plain";
  }
  if (~label.indexOf("exec")){
    var filepath = "%EXECHOST," + hostid + "%/sar/" + filename;
    var sysHostPanel = $("#sys-metrics-menu-exec" + hostid);
  }else{
    var filepath = "%STATHOST," + hostid + "%/sar/" + filename;
    var sysHostPanel = $("#sys-metrics-menu" + hostid);
  } 
  var fileLinkLi = $("<li></li>");
  var fileLink = $("<a></a>").text(filename)
    .attr("href", "output.php?testid=" + testid + "&compids=" + compids +
      "&filename=" + filepath + "&format=" + format);
  $(fileLinkLi).append(fileLink);
  $(sysHostPanel).append(fileLinkLi);
}

function fillLogsHost(host) {
  var navigationUl = $("#navigation-panel");
  var logsHostPanel = buildTreeRoot(host);
  var logsFilesList = $("<ul></ul>").attr("id","logs-menu");
  $(logsHostPanel).append(logsFilesList);
  $(navigationUl).append(logsHostPanel);
}   
      
function fillLogs(testid, compids, filename, path, filepath) {
  var extension = filename.replace(/^.*\./, '');
  var format;
  if (extension === "plt"){
    format = "graph";
  }else if (extension === "csv"){
    format = "table";
  }else{
    format = "plain";
  }

  var logsPanel = $("#logs-menu").last();
  var fileLinkLi = $("<li></li>");
  var format = "plain";
  var fileLink = $("<a></a>").text(filename)
    .attr("href", "output.php?testid=" + testid + "&compids=" + compids +
      "&filename=" + filepath + filename + "&format=" + format);
  $(fileLinkLi).append(fileLink);
  $(logsPanel).append(fileLinkLi);
}   

function buildLeftPanelFramework(frameworkname, frameworkid) {
  var navigationUl = $("#navigation-panel");
  var frameworkPanel = buildTreeRoot("Framework");
  var frameworkPanelList = $("<ul></ul>");
  
  var createLi = $('<li></li>');
  var createLink = $('<a></a>').text('Create')
    .attr('href', 'create_edit_framework.php?action=create');
  $(createLi).append(createLink);
  $(frameworkPanelList).append(createLi); 

  if (frameworkid) {
    var cloneLi = $('<li></li>');
    var cloneLink = $('<a></a>').text('Clone')
      .attr('href', 'create_edit_framework.php?action=clone&frameworkid=' + frameworkid);
    $(cloneLi).append(cloneLink);
    $(frameworkPanelList).append(cloneLi);

    var editLi = $('<li></li>');
    var editLink = $('<a></a>').text('Edit')
      .attr('href', 'create_edit_framework.php?action=edit&frameworkid=' + frameworkid);
    $(editLi).append(editLink);
    $(frameworkPanelList).append(editLi);
  }
   
  $(frameworkPanel).append(frameworkPanelList);
  $(navigationUl).append(frameworkPanel);
}

function buildLeftPanelGlobal() {
  var navigationUl = $("#navigation-panel");
  var globalPanel = buildTreeRoot("Global");
  $(globalPanel).find("a").attr("style", "border-bottom:none");
  var globalPanelList = $("<ul></ul>");

  var queueLi = $('<li></li>');
  var queueLink = $('<a></a>').text('Queue')
    .attr("id", "global-panel")
    .attr("href", "/");
  
  var queueBadge = $("<span></span>").addClass("badge queue-badge");
  $(queueLink).append(queueBadge);

  $(queueLi).append(queueLink);
  $(globalPanelList).append(queueLi);
  
  var adminLi = $('<li></li>');
  var adminLink = $("<a></a>").text("Admin")
    .attr("href", "admin.php");
  $(adminLi).append(adminLink);
  $(globalPanelList).append(adminLi);

  $(globalPanel).append(globalPanelList);
  $(navigationUl).append(globalPanel);
  queryQueueCount();
  setInterval(function() { queryQueueCount(); }, 5000);
}

function runTest(testid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == 4 && xhttp.status == 200) {
      window.location.href = "/";
    }
  };
  xhttp.open("GET", location.protocol + "//" + location.host +
      "/database_access.php?query=runTest&testid=" + testid, true);
  xhttp.send();
}

function killTest(testid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == 4 && xhttp.status == 200) {
      window.location.href = "/";
    }
  };
  xhttp.open("GET", location.protocol + "//" + location.host +
      "/database_access.php?query=killTest&testid=" + testid, true);
  xhttp.send();
}

function updateQueueCount(json_obj, type) {
  var badge = $("#" + type + "-panel").find(".queue-badge");
  var count = json_obj[0]["COUNT(testid)"];
  $(badge).text(count);
}

function queryQueueCount(frameworkId) {
  var xhttp = new XMLHttpRequest();
  if (frameworkId) {
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == 4 && xhttp.status == 200) {
        updateQueueCount(JSON.parse(xhttp.responseText), "test");
      }
    };
  } else {
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == 4 && xhttp.status == 200) {
        updateQueueCount(JSON.parse(xhttp.responseText), "global");
      }
    };
  }
  var f_clause = frameworkId ? "&frameworkid=" + frameworkId : "";
  xhttp.open("GET", location.protocol + "//" + location.host +
      "/database_access.php?query=queueCount&respond=1" + f_clause, true);
  xhttp.send();
}

function validatePasswordForm(formName, pw1Name, pw2Name) {
    var pw1 = document.forms[formName][pw1Name].value;
    var pw2 = document.forms[formName][pw2Name].value;
    if(pw1 !== pw2) {
        alert("Password does not match");
        return false;
    }
}
