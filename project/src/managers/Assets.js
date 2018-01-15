var Configurations = require('../configurations/Configurations');

var $game, $mode, $path, $pathAudio, $configurations, $conf;

class Assets {

    get settings() { return $conf; }

    constructor(game){
        $game = game;
        $configurations = new Configurations($game);
        $conf = $configurations.settings;
    }

    initialize()
    {
        if ($game.device.desktop)
        {
        $path = 'ats/img';          //desktop img path
        }
        else $path = 'ats/img';     //mobile img path

        $pathAudio = 'ats/aud';     //audio path

    }

    loadImage(name)
    {
        $game.load.image(name, $path + '/' + name + '.png');
    }

    loadAtlas(name){
        $game.load.atlas(name, $path + '/' + name + '.png', $path + '/' + name + '.json');
    }

    loadAudio(name)
    {
        $game.load.audio(name, $pathAudio + '/' + name  + `.mp3`);
    }

    loadAssets(){
        this.initialize();

        //load image
        //this.loadImage('board');

        //load atlas
        this.loadAtlas('blocks');

        //load audio
        //this.loadAudio('melody');
    }


    useAsset (name, what, optNameAtlas, optFcnCtrl){
        return putOnTheBord(name, what, optNameAtlas, optFcnCtrl);
    }
}



function putOnTheBord(name, what, optNameAtlas, optFcnCtrl){
    var variable;
    switch(what) {

        case 'img':
        case 'image':

            variable = $game.add.image($conf[name].x, $conf[name].y, name);
            variable.anchor.setTo($conf[name].anchorX, $conf[name].anchorY);
            variable.alpha = $conf[name].alpha;

            break;


        case 'spr':
        case 'sprite':

            variable = $game.add.sprite($conf[name].x, $conf[name].y, name);
            variable.anchor.setTo($conf[name].anchorX, $conf[name].anchorY);
            variable.alpha = $conf[name].alpha;

            break;


        case 'atlas':

            variable = $game.add.atlas(0, 0, name);
            //variable.alpha = $conf[name].alpha;

            break;


        case 'sprAtlas':
        case 'spriteAtlas':

            variable = $game.add.sprite($conf[name].x, $conf[name].y, optNameAtlas);
            variable.frameName = name + '.png';
            variable.anchor.setTo($conf[name].anchorX, $conf[name].anchorY);
            variable.alpha = $conf[name].alpha;

            break;


        case 'btnAtlas':
        case 'buttonAtlas':
            variable = $game.add.button($conf[name].x, $conf[name].y, optNameAtlas, optFcnCtrl);
            variable.frameName = name + '.png';
            variable.anchor.setTo($conf[name].anchorX, $conf[name].anchorY);
            variable.alpha = $conf[name].alpha;

            break;


        case 'txt':
        case 'text':
            variable = $game.add.text($conf[name].x, $conf[name].y,'some text',
                                { font: $conf[name].font, fill: $conf[name].color, align: $conf[name].align});
            variable.anchor.setTo($conf[name].anchorX, $conf[name].anchorY);
            variable.alpha = $conf[name].alpha;

            break;


        case 'sng':
        case 'audio':
            variable = $game.add.audio(name);
            variable.volume = $conf[name].volume;
            break;


        default:
            console.log('assets.js par "what" problem, variable: ' + variable + ', name: ' + name +'.');
    }

    return variable;
}




module.exports = Assets;
