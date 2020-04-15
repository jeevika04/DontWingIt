class ColorScheme{
    constructor(zero, one, two, three, zero_l, one_l, two_l, three_l){
        this.color_zero = "rgb("+zero+")";
        this.color_one = "rgb("+one+")";;
        this.color_two = "rgb("+two+")";
        this.color_three = "rgb("+three+")";
        this.color_zero_lighter = "rgb("+zero_l+")";
        this.color_one_lighter = "rgb("+one_l+")";
        this.color_two_lighter = "rgb("+two_l+")";
        this.color_three_lighter = "rgb("+three_l+")";
    }
    
};
var colorScheme = generateQuadColorScheme();
console.log("color scheme: "+colorScheme);
var testing_count = 0;
var design_count = 0;
var get_expert_testing_issues_html = 
'<div id = "get-expert-issues">'+
    '<label for = "why-failed-expert-testing">Why did the website fail expert testing?</label>'+
    '<div class="input-group" id = "why-failed-expert-testing">'+
        '<input type="text" class="form-control" placeholder="Reason for failing" id = "expert-text" aria-label="Reason for failing" aria-describedby="why-failed-expert-testing">'+
        '<div class="input-group-append">'+
        '<button class="btn btn-primary" type="button" id = "add-expert-issue">Add</button>'+
        '<button class="btn btn-secondary" type="button" id = "done-adding-expert-issues">Done</button>'+
        '</div>'+
    '</div>';
'</div>';
var get_user_testing_issues_html = 
'<div id = "get-user-issues">'+
    '<label for = "why-failed-user-testing">Why did the website fail user testing?</label>'+
    '<div class="input-group" id = "why-failed-user-testing">'+
        '<input type="text" class="form-control" placeholder="Reason for failing" id = "user-text" aria-label="Reason for failing" aria-describedby="why-failed-user-testing">'+
        '<div class="input-group-append">'+
        '<button class="btn btn-primary" type="button" id = "add-user-issue">Add</button>'+
        '<button class="btn btn-secondary" type="button" id = "done-adding-user-issues">Done</button>'+
        '</div>'+
    '</div>'
'</div>';

function generateDevelopmentDesignChecklistItem(content){
    var id = "devdes"+design_count;
    var development_design_checklist_item_html = 
    '<div class = "ch-item">'+
        '<input type="checkbox" aria-label="'+content+'" class = "item" id = "'+id+'">'+
        '<label for = "'+id+'" class = "dev-label">'+
            '<div class = "design-issue-reference reference">'+
                'Design'+
            '</div>'+
            '<div>'+content+'</div>'+
        '</label>'+
    '</div>';
    return development_design_checklist_item_html;
}
function generateDevelopmentDesignChecklistItemNoReference(content){
    var id = "devdes"+design_count;
    var development_design_checklist_item_no_html = 
    '<div class = "ch-item">'+
        '<input type="checkbox" aria-label="'+content+'" class = "item" id = "'+id+'">'+
        '<label for = "'+id+'" class = "dev-label">'+
            content
        '</label>'+
    '</div>';
    console.log("s f", development_design_checklist_item_no_html);
    return development_design_checklist_item_no_html;
}
function generateDevelopmentExpertTestingChecklistItem(content){
    var id = "devtest"+testing_count;
    var development_expert_checklist_item_html = 
    '<div class = "ch-item">'+
        '<input type="checkbox" aria-label="'+content+'" class = "item" id = "'+id+'">'+
        '<label for = "'+id+'" class = "dev-label">'+
            '<div class = "testing-issue-reference reference">'+
                'Expert Testing'+
            '</div>'+
            content
        '</label>'+
    '</div>';
    console.log(development_expert_checklist_item_html);
    return development_expert_checklist_item_html;
}
function generateDevelopmentUserTestingChecklistItem(content){
    var id = "devtest"+testing_count;
    var development_user_checklist_item_html = 
    '<div class = "ch-item">'+
        '<input type="checkbox" aria-label="'+content+'" class = "item" id = "'+id+'">'+
        '<label for = "'+id+'" class = "dev-label">'+
            '<div class = "testing-issue-reference reference">'+
                'User Testing'+
            '</div>'+
            content
        '</label>'+
    '</div>';
    return development_user_checklist_item_html;
}
function generateQuadColorScheme(){
    var cs = new ColorScheme();
    var start_color = [0, 83, 102];
    var start_color_hsl = rgb_to_hsl(start_color);
    var first_color = start_color_hsl;
    var second_color = start_color_hsl;
    var third_color = start_color_hsl;
    first_color = [((first_color[0] + 90) % 360), first_color[1], first_color[2]];
    second_color = [((first_color[0] + 180) % 360), first_color[1], first_color[2]];
    third_color = [((first_color[0] + 270) % 360), first_color[1], first_color[2]];
    console.log("hsl of each color", first_color, second_color, third_color);
    var scheme = [start_color_hsl];
    var color = scheme[0];
    for(var i = 1; i <= 4; i++){
        while(scheme.includes(color)){
            color = [((color[0] + 90) % 360), color[1], color[2]];
        };
        scheme.push(color);
    }
    console.log("scheme", scheme);
    var scheme_rgb = [start_color, hsl_to_rgb(scheme[1]), hsl_to_rgb(scheme[2]), hsl_to_rgb(scheme[3])]
    //return [start_color, hsl_to_rgb(first_color), hsl_to_rgb(second_color), hsl_to_rgb(third_color)];
    console.log("scheme_rgb", scheme_rgb);
    return scheme_rgb;
}
function relative_luminance(colorArray8Bit){
  var r, g, b;
  var l;
  var standard_red = colorArray8Bit[0]/255;
  var standard_green = colorArray8Bit[1]/255;
  var standard_blue = colorArray8Bit[2]/255; 
  //console.log("sR", standard_red);
  //console.log("sG", standard_green);
  //console.log("sB", standard_blue);
  ////console.log(standard_red);
  if(standard_red <= 0.03928){
    //console.log("path 1");
    r = standard_red/12.92;
  }
  else {
    
    r = Math.pow(((standard_red+0.055)/1.055), 2.4);

  }

  if(standard_green <= 0.03928){
    //console.log("path 1");
    g = standard_green/12.92;
  }
  else {
    g= Math.pow(((standard_green+0.055)/1.055), 2.4);
  }

  if(standard_blue <= 0.03928){
    //console.log("path 1");
    b = standard_blue/12.92;
  }
  else {
    b = Math.pow(((standard_blue+0.055)/1.055), 2.4);
  }
  l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return l;
}
function accessibleContrastRatio(scheme){
  return contrast_ratio(relative_luminance(scheme[0]), relative_luminance(scheme[1])) >= 7.0;
}
function colorArrayToString(array){
    return "rgb("+array[0]+","+array[1]+","+array[2]+")";
};

function getCurrentMilitaryTime(){
    var date = new Date();
    return date.getHours().toString()+date.getMinutes().toString();
    //return "1901";
}
function getCapitalizedWord(string){ 
    var new_char = string[0].toUpperCase();
    var new_string = new_char + string.substring(1, string.length);
    ////console.log("new string", new_string);
    return new_string;
}
function capitalizeSentence(sentence){
    if(sentence.length == 0){
        console.log("empty sentence", sentence);
        return "";
    }
    var words = sentence.split(" ");
    var new_words = [];
    words.forEach((current_word)=>{
        new_words.push(getCapitalizedWord(current_word));
    })
    return new_words.join(" ");
}


function getCurrentTasks(){
    var current_tasks = [];
    var current_time = getCurrentMilitaryTime();
    //console.log("current military time", current_time);
    board.data.forEach((task)=>{
        if(inside(current_time, task.start, task.end)){
            current_tasks.push(task);
        }
    });
    return current_tasks;
}
function applyColorScheme(colors){
    console.log("applying color scheme");
    var lightc0 = hsl_to_rgb( lightenColor( rgb_to_hsl( colors[0] ) ) );
    var lightc1 = hsl_to_rgb( lightenColor( rgb_to_hsl( colors[1] ) ) );
    var lightc2 = hsl_to_rgb( lightenColor( rgb_to_hsl( colors[2] ) ) );
    var lightc3 = hsl_to_rgb( lightenColor( rgb_to_hsl( colors[3] ) ) );
    $("#info-bar").css("background-color", "rgb("+lightc0+")");
    $("#info-bar").css("color", "rgb("+colors[0]+")");
    $(".score").css("color", "rgb("+colors[0]+")");
    $(".design").css("color", "rgb("+colors[1]+")");
    $(".development").css("color", "rgb("+colors[2]+")");
    $(".testing").css("color", "rgb("+colors[3]+")");
    $(".design").css("background-color", "rgb("+lightc1+")");
    $(".development").css("background-color", "rgb("+lightc2+")");
    $(".testing").css("background-color", "rgb("+lightc3+")");
    $(".design-issue-reference").css("color", "rgb("+colors[1]+")");
    $(".testing-issue-reference").css("color", "rgb("+colors[3]+")");
    $(".design-issue-reference").css("background-color", "rgb("+lightc1+")");
    $(".testing-issue-reference").css("background-color", "rgb("+lightc3+")");
}
function contrast_ratio(lum1, lum2){
    var l1 = Math.max(lum1, lum2);
    var l2 = Math.min(lum1, lum2);
    var cr = (l1 + 0.05)/(l2 + 0.05);
    console.log(cr);
    return cr;
}

function rgb_to_hsl(rgb){
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h, s, l];
}

function hsl_to_rgb(hsl){
    // Must be fractions of 1
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}

function getAnalogousColor(hsl){
    console.log("color before hue shift", hsl);
    var oneOrZero = Math.round(Math.random());
    if(oneOrZero == 0){
        hsl[0] = (hsl[0] + 30);
        if(hsl[0] > 360) {
            hsl[0] -= 360;
        }
    }
    else {
        hsl[0] = (hsl[0] - 30);
        if(hsl[0] > 360) {
            hsl[0] -= 360;
        }
    }

    console.log("color after hue shift", hsl);
    return [hsl[0], hsl[1], hsl[2]];
}
  
function satisfactoryContrastRatio(rgbColor1, rgbColor2){
    return contrast_ratio(relative_luminance(rgbColor1), relative_luminance(rgbColor2)) >= 7;
}

function lightenColor(color){
    color[2] += 65;
    if(color[2] > 100) {
        color = 100;
    }
    return color;
}
function darkenColor(color){
    color[2] -= 60;
    if(color[2] < 0) {
        color = 0;
    }
    return color;
}


$(document).ready(function(){
    applyColorScheme(colorScheme);
});

function toMilitaryTime(time){
    if(time.length == 0){
        return "0000";
    }
    //var time = $("#starttime").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    //alert(sHours + ":" + sMinutes);
    return sHours+sMinutes;
}
function displayGetExpertIssues(){
    $("#get-expert-issues-slot").append(get_expert_testing_issues_html);
}
function removeGetExpertIssues(){
    console.log("done adding expert issues");
    $("#get-expert-issues-slot").empty();
}
function displayGetUserIssues(){
    $(get_user_testing_issues_html).appendTo("#get-user-issues-slot");
}
function removeGetUserIssues(){
    console.log("done adding user issues");
    $("#get-user-issues-slot").empty();
}
function addDesignToDevelopment(){
    design_count++;
    $(".show-development-issues-slot").append(getDesignTask());
    applyColorScheme(colorScheme);
}
function addDesignToTesting(){
    design_count++;
    $("#get-specific-features-slot").append(getDesignTaskNoReference());
    applyColorScheme(colorScheme);
}
function addUserIssueToDevelopment(){
    testing_count++;
    $(".show-development-issues-slot").append(getUserIssue());
    applyColorScheme(colorScheme);
}
function addExpertIssueToDevelopment(){
    testing_count++;
    $(".show-development-issues-slot").append(getExpertIssue());
    applyColorScheme(colorScheme);
}
function getDesignTask(){
    var design_text = $("#design-text").val();
    console.log("design task:"+design_text);
    var design_html = generateDevelopmentDesignChecklistItem(design_text);
    console.log("design html",design_html);
    return design_html;
}
function getDesignTaskNoReference(){
    var design_text = $("#design-text").val();
    console.log("design task:"+design_text);
    var design_html = generateDevelopmentDesignChecklistItemNoReference(design_text);
    console.log("design html",design_html);
    return design_html;
}
function getUserIssue(){
    var user_text = $("#user-text").val();
    console.log("user text", user_text);
    $("#user-text").empty();
    return generateDevelopmentUserTestingChecklistItem(user_text);
}
function getExpertIssue(){
    var expert_text = $("#expert-text").val();
    $("#expert-text").empty();
    return generateDevelopmentExpertTestingChecklistItem(expert_text);
}
function clearDesignTask(){
    $("#design-text").val("");
}

$(document).on('keyup', function(e) {
    if(e.which == 8){
        //backspace
    }

    if(e.which == 13) {
        //enter
        if($("#failed-expert").is(":focus")){
            displayGetExpertIssues();
        }
        else if($("#done-adding-expert-issues").is(":focus")){
            removeGetExpertIssues();
        }
        else if($("#failed-user").is(":focus")){
            displayGetUserIssues();
        }
        else if($("#done-adding-user-issues").is(":focus")){
            removeGetUserIssues();
        }
        else if($("#add-user-issue").is(":focus")){
            addUserIssueToDevelopment();
        }
        else if($("#add-expert-issue").is(":focus")){
            addExpertIssueToDevelopment();
        }
        else if($("#add-design").is(":focus")){
            addDesignToDevelopment();
            addDesignToTesting();
            clearDesignTask();
        }
    }
});