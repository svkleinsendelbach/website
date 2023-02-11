import { Component } from '@angular/core';
import { FullDatum } from '../../classes/full-datum';
import { BfvLiveticker, GameInfo } from '../../classes/game-info';
import { DeviceTypeService } from '../../services/device-type.service';
import { StyleConfigService } from '../../services/style-config.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.sass']
})
export class GameInfoComponent {
  public gameInfo = exampleGameInfo;

  public constructor(
    public readonly deviceType: DeviceTypeService,
    public readonly styleConfig: StyleConfigService
  ) {}

  public get gameDateDescription(): string {
    return FullDatum.description(FullDatum.fromDate(new Date(this.gameInfo.date)));
  }

  public googleMapsLink(adress: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(adress)}&hl=de`;
  }
}

export const exampleLivetickerResults: BfvLiveticker.Result[] = [
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B963DK000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B963DK000000VS5489B4VV4Q42OO'
    },
    'text': 'Die vielen Wechsel haben den Spielfluss komplett gestört und es passiert relativ wenig. Heimstetten bemüht, aber Haching steht jetzt sehr sicher und lässt nichts anbrennen.',
    'time': 85,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B963DK000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B8JIQ0000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B8JIQ0000000VS5489B4VV4Q42OO'
    },
    'text': 'Die offizielle Zuschauerzahl lautet: 500',
    'time': 84,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B8JIQ0000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B5MTRS000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B5MTRS000000VS5489B4VV4Q42OO'
    },
    'text': 'Der SV Heimstetten ist in der 2. Halbzeit die aggressivere Mannschaft und auch mehr Spielanteile. Leider fehlt bisher der Anschlusstreffer.',
    'time': 70,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B5MTRS000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AR2A1G000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AR2A1G000000VS5489B4VV4Q42OO'
    },
    'text': 'Haching kontrolliert das Spiel und lässt den Ball schön laufen. Heimstetten fällt gerade durch mehrere Fouls auf.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AR2A1G000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4ANSJFS000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4ANSJFS000000VS5489B4VV4Q42OO'
    },
    'text': 'Der SV Heimstetten muss wieder Ordnung ins Spiel bringen. Bei jedem Angriff der Hachinger brennt die Hütte.',
    'time': 32,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4ANSJFS000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AJSR5K000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AJSR5K000000VS5489B4VV4Q42OO'
    },
    'text': 'Und jetzt noch etwas zum Spiel. Zwei sehr engagierte Mannschaften mit viel Einsatz auf einem schwer zu bespielenden Rasen. Die Spielanteile sind ausgeglichen und man merkt bisher nicht das der Tabellenführer gegen das Schlusslicht spielt.',
    'time': 13,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AJSR5K000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4ACLMIS000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4ACLMIS000000VS5489B4VV4Q42OO'
    },
    'text': 'Dem SV Heimstetten steht mit dem Heimspiel gegen Unterhaching der Auftakt einer englischen Woche bevor. Reza Sakhi Zada darf nach seiner Gelb-Rot-Sperre wieder mitwirken, Yannick Günzel (fünfte Gelbe Karte) muss sich noch bis zur Nachholpartie gegen Türkgücü München (Dienstag, 19 Uhr) gedulden. Bei derzeit neun Punkten Rückstand auf einen Relegationsrang steht der SVH unter Druck, die Lücke zumindest nicht noch größer werden zu lassen.',
    'time': null,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4ACLMIS000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4ACGKAK000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4ACGKAK000000VS5489B4VV4Q42OO'
    },
    'text': 'Die SpVgg Unterhaching kann mit einem Erfolg heute (ab 18:30 Uhr) beim Schlusslicht SV Heimstetten den Druck auf Verfolger Würzburger Kickers weiter erhöhen. Mit dem dann elften Sieg aus den zurückliegenden zwölf Begegnungen würde der ehemalige Bundesligist seinen Vorsprung zumindest vorübergehend auf sechs Punkte ausbauen. Das bedeutet: Um doch noch als Tabellenführer zu überwintern, müssten die Kickers die beiden noch ausstehenden Partien im Jahr 2022 gewinnen und zum Abschluss auf eine Niederlage der SpVgg hoffen. Der erneut für die deutsche U 18-Nationalmannschaft nominierte Offensivspieler Maurice Krattenmacher wird den Hachingern im letzten Auswärtsspiel des Jahres fehlen. Das Hinspiel gewann der Ligaprimus 3:2.',
    'time': null,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4ACGKAK000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BJ6APO000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BJ6APO000000VS5489B3VUVTC6K3'
    },
    'text': 'Fazit: Am Ende wollte Haching einen Tick mehr den Sieg. Lucky Punch kurz vor Schluss von Mathias Fetsch.',
    'time': null,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BJ6APO000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'comment',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BJ0LA8000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BJ0LA8000000VS5489B3VUVTC6K3'
    },
    'text': 'Ausführliche Berichte und Stimmen zu allen Partien des 22. Spieltags gibt es in Kürze auf www.bfv.de',
    'time': null,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BJ0LA8000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'type': 'section',
    'text': 'Erste Halbzeit'
  },
  {
    'type': 'section',
    'text': 'Vorbericht'
  },
  {
    'type': 'section',
    'text': 'Erste Halbzeit'
  },
  {
    'type': 'section',
    'text': 'Vorbericht'
  },
  {
    'type': 'section',
    'text': 'Erste Halbzeit'
  },
  {
    'type': 'section',
    'text': 'Vorbericht'
  },
  {
    'type': 'section',
    'text': 'Erste Halbzeit'
  },
  {
    'type': 'section',
    'text': 'Vorbericht'
  },
  {
    'type': 'section',
    'text': 'Nachbericht'
  },
  {
    'type': 'section',
    'text': 'Erste Halbzeit'
  },
  {
    'headline': 'Abpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B9U4Q4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B9U4Q4000000VS5489B4VV4Q42OO'
    },
    'text': 'Vor 500 Zuschauern gewinnt die Spvgg Unterhaching beim SV Heimstetten mit 3:0 (3:0). Die ersten 15 Minuten konnten die Hausherren ausgeglichen gestalten, danach schlug Haching dreimal eiskalt zu. Damit fand Heimstetten in der 1. Halbzeit nicht mehr statt. Im zweiten Durchgang war Heimstetten deutlich besser im Spiel und hatte auch mehr Chancen. Da der Anschlusstreffer nicht fiel, war es am Ende ein ungefährdeter Sieg für die Gäste.',
    'time': 91,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B9U4Q4000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Anpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AVJSIO000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AVJSIO000000VS5489B4VV4Q42OO'
    },
    'text': 'Und weiter geht´s in Heimstetten!',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AVJSIO000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Abpfiff 1. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AR7PQC000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AR7PQC000000VS5489B4VV4Q42OO'
    },
    'text': 'Verdiente Führung für die Gäste auch in dieser Höhe. Der SV Heimstetten konnte nur die ersten 15 Minuten ausgeglichen gestalten, danach wurde der Druck zu groß und es klingelte dreimal im Tor der Hausherren. Haching spielte nach der Führung sehr gut und kontrolliert und kam zu weiteren Chancen. Heimstetten brauch schon ein kleines Wunder um heute Abend noch zu punkten.',
    'time': 48,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AR7PQC000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Anpfiff 1. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AGDTG8000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AGDTG8000000VS5489B4VV4Q42OO'
    },
    'text': 'Und los geht´s im ATS Sportpark Heimstetten! Schiedsrichter Assad Nouhoum pfeift das Spiel an.',
    'time': 1,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AGDTG8000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Abpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BIUV2C000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BIUV2C000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 94,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BIUV2C000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Anpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B7P8HK000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B7P8HK000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B7P8HK000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Abpfiff 1. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B3P8GK000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B3P8GK000000VS5489B3VUVTC6K3'
    },
    'text': 'Kurzfazit: Beide Mannschaften auf Augenhöhe. Die Vorstädter mit einem Tick mehr Spielanteilen, doch die Fuggerstädter mit zwei, drei gefährlichen Kontern. Ein spannendes torloses Unentschieden hier im Alpenbauer Sportpark in Unterhaching.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B3P8GK000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Anpfiff 1. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2APDOQC000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2APDOQC000000VS5489B3VUVTC6K3'
    },
    'text': 'Schiedsrichter Maxi Ziegler pfeift das Spiel an. Ihm assistieren heute Hannes Hemrich und Maxi Graf. Los geht´s. Das Stadion ist sehr gut gefüllt. Mehrere tausend Zuschauer*innen werden erwartet.',
    'time': 1,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2APDOQC000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Abpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 3,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03H0HRC000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03H0HRC000000VS5489B3VUVTC6K3'
    },
    'text': 'Da ist der Schlußpfiff nach spannenden 96 Minuten. Nach 1:3-Rückstand gewinnt die SpVgg Unterhaching noch mit 4:3. Die zahlenmäßige Überzahl konnte man doch noch ausnutzen zu seinen Gunsten. Tschüß aus Illertissen. Bis zum nächsten Mal.',
    'time': 96,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03H0HRC000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Anpfiff 2. Halbzeit',
    'type': 'whistle',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K034S054000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K034S054000000VS5489B3VUVTC6K3'
    },
    'text': 'Das Spiel geht weiter in Illertissen. Haching hat gleich dreimal gewechselt in der Pause.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K034S054000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BGEP2K000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BGEP2K000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 83,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BGEP2K000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für FC Augsburg II',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BFCF30000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BFCF30000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 79,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BFCF30000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für FC Augsburg II',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BEPTEG000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BEPTEG000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 76,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BEPTEG000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B2LR5G000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B2LR5G000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 41,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B2LR5G000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B1P368000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B1P368000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 37,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B1P368000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für FC Augsburg II',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B084A0000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B084A0000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 30,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B084A0000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2AVPN0K000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2AVPN0K000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 28,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2AVPN0K000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2AURQKG000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2AURQKG000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 24,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2AURQKG000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für SpVgg Unterhaching',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2APIBOK000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2APIBOK000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 1,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2APIBOK000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ecke für FC Würzburger Kickers',
    'type': 'corner',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JFOKL0000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JFOKL0000000VS5489B5VUU0HQ6C'
    },
    'text': 'Eckball durch Ivan Franjic. Der Eckball wird abgewehrt.',
    'time': 69,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0LATLOG000001VS5489B2VUE0KJBN/02K4JFOKL0000000VS5489B5VUU0HQ6C/02IFGQ2MEG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für SpVgg Unterhaching',
    'type': 'penalty',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03F07DG000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03F07DG000000VS5489B3VUVTC6K3'
    },
    'text': 'Herzig foult Ehlich.',
    'time': 89,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03F07DG000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für TSV Rain/Lech',
    'type': 'penalty',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JIBTTO000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JIBTTO000000VS5489B4VV4Q42OO'
    },
    'text': 'Nach einem Freistoß hoch in den Strafraum hält Ali Loune Kevin Gutia fest. Schiedsrichter Steffen Ehwald zeigt auf den Punkt.',
    'time': 83,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4JIBTTO000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für 1. FC Nürnberg II',
    'type': 'penalty',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JG3S38000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JG3S38000000VS5489B4VV4Q42OO'
    },
    'text': 'Matej Naprstek kommt am Strafraum zu Fall. Die Zuschauer sind aufgebracht, die Spieler der Gastgeber bestürmen Schiedsrichter Steffen Ehwald, die Aktion sei außerhalb des Strafraum gewesen. Es bleibt dabei.',
    'time': 73,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4JG3S38000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für SV Wacker Burghausen',
    'type': 'penalty',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JM3UQO000000VS5489B8VVPPHI0N',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JM3UQO000000VS5489B8VVPPHI0N'
    },
    'text': 'Daniel Cheron foult Thomas Winklbauer.',
    'time': 94,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K122Q2RS000000VS5489B7VVD8F40G/02K4JM3UQO000000VS5489B8VVPPHI0N/02IFGQ2LVG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für SV Viktoria Aschaffenburg',
    'type': 'penalty',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4IV61AS000000VS5489B8VVPPHI0N',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4IV61AS000000VS5489B8VVPPHI0N'
    },
    'text': 'Ein Wacker-Verteidiger blockt einen Schuss von Hamza Boutakhrit im Strafraum mit der Hand.',
    'time': 12,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K122Q2RS000000VS5489B7VVD8F40G/02K4IV61AS000000VS5489B8VVPPHI0N/02IFGQ2LVG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für 1. FC Schweinfurt',
    'type': 'penalty',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K0356A24000000VS5489B4VVD074B6',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K0356A24000000VS5489B4VVD074B6'
    },
    'text': 'Adam Jabiri wird in der Luft am Bein getroffen und geht zu Boden. Der Pfiff sorgt natürlich für Diskussionen, aber es gibt Elfmetert.',
    'time': 52,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02CJR8G000001VS5489B4VVD074B6/02K0356A24000000VS5489B4VVD074B6/02IFGQ2PF4000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für FC Bayern München II',
    'type': 'penalty',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JVR57H50000000VS5489B6VSUH5K1R',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JVR57H50000000VS5489B6VSUH5K1R'
    },
    'text': null,
    'time': 77,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JV0R94EO000001VS5489B2VVP8FH6E/02JVR57H50000000VS5489B6VSUH5K1R/02IFGQ2OQ0000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für FC Bayern München II',
    'type': 'penalty',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B7AOFS000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B7AOFS000000VS5489B5VUU0HQ6C'
    },
    'text': 'Foulspiel am aufgerückten Angelo Brückner im Strafraum der DJK und der sicher leitende Schiri Treiber zeigt folgerichtig und protestfrei auf den Punkt.',
    'time': 58,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2VM625C000000VS5489B7VVD8F40G/02K4B7AOFS000000VS5489B5VUU0HQ6C/02IFGQ2M38000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für FC Augsburg II',
    'type': 'penalty',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQSVHF4000000VS5489B1VUGSQH17',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQSVHF4000000VS5489B1VUGSQH17'
    },
    'text': null,
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JSISJB94000001VS5489B3VTJN61RV/02JTQSVHF4000000VS5489B1VUGSQH17/02IFGQ2QAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Elfmeter für DJK Vilzing',
    'type': 'penalty',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQR7024000000VS5489B1VUGSQH17',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQR7024000000VS5489B1VUGSQH17'
    },
    'text': 'Kuffner spitzelt einen Augsburger Spieler die Kugel vom Fuß und wird gefoult. Schiedsrichter Dinger entscheidet sofort auf Strafstoß.',
    'time': 39,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JSISJB94000001VS5489B3VTJN61RV/02JTQR7024000000VS5489B1VUGSQH17/02IFGQ2QAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Eigentor durch SV Etzenricht',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02KIE0J1S4000000VS5489B5VUAI5069',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02KIE0J1S4000000VS5489B5VUAI5069'
    },
    'text': null,
    'time': 10,
    'reportLink': 'https://www.bfv.de/ticker/melden/02KIDU6U80000000VS5489B5VUAI5069/02KIE0J1S4000000VS5489B5VUAI5069/02K65FENQ4000000VS5489B4VSE4O2I9'
  },
  {
    'headline': 'Eigentor durch 1.FC Geesdorf',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02R3DI8000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02R3DI8000000VS5489B6VV4DR9A5'
    },
    'text': 'Nach Eckball',
    'time': 21,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02LEKVC000001VS5489B6VV4DR9A5/02K02R3DI8000000VS5489B6VV4DR9A5/02IFIGQ09S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Eigentor durch 1.FC Geesdorf',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02R3DI8000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02R3DI8000000VS5489B6VV4DR9A5'
    },
    'text': 'Nach Eckball',
    'time': 21,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02LEKVC000001VS5489B6VV4DR9A5/02K02R3DI8000000VS5489B6VV4DR9A5/02IFIGQ09S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Eigentor durch Johannes Lindner (21)',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 4,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K0DJEKRK000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K0DJEKRK000000VS5489B6VV4DR9A5'
    },
    'text': null,
    'time': 75,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0D16TO4000001VS5489B5VT8CT2E0/02K0DJEKRK000000VS5489B6VV4DR9A5/02IGAS557C000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Eigentor durch SE Freising',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR9U63S000000VS5489B6VS3F3RJ1',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR9U63S000000VS5489B6VS3F3RJ1'
    },
    'text': 'Rückpass Zum TW  ,  nur der TW stand nicht da und der \nBall ging ins leere Tor',
    'time': 40,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTR08ECC000001VS5489B6VS3F3RJ1/02JTR9U63S000000VS5489B6VS3F3RJ1/02IGAS5CIK000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Eigentor durch Sepp Kollie (26)',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR3M77C000000VS5489B6VTQROS91',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR3M77C000000VS5489B6VTQROS91'
    },
    'text': null,
    'time': 56,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQ8JD54000001VS5489B6VTQROS91/02JTR3M77C000000VS5489B6VTQROS91/02IGAS5D1O000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Eigentor durch Tom Zierock (1)',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JRTUS7US000000VS5489B5VS1ODO3E',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JRTUS7US000000VS5489B5VS1ODO3E'
    },
    'text': null,
    'time': 86,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JRT6HBG8000002VS5489B5VS1ODO3E/02JRTUS7US000000VS5489B5VS1ODO3E/02INNVU3GO000000VS5489B4VS7CGIFK'
  },
  {
    'headline': 'Eigentor durch Dennis Weiler (18)',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JU4S0RA0000000VS5489B6VTQROS91',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JU4S0RA0000000VS5489B6VTQROS91'
    },
    'text': null,
    'time': 1,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JU4P12C8000000VS5489B5VS0OTKFF/02JU4S0RA0000000VS5489B6VTQROS91/02INNVU10O000000VS5489B4VS7CGIFK'
  },
  {
    'headline': 'Eigentor durch SV Merkendorf',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K0D1AHKG000000VS5489B5VT8CT2E0',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K0D1AHKG000000VS5489B5VT8CT2E0'
    },
    'text': null,
    'time': 13,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0CRUB9G000001VS5489B5VT8CT2E0/02K0D1AHKG000000VS5489B5VT8CT2E0/02IHFD2U04000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Eigentor durch SV Merkendorf',
    'type': 'ownGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K0D1AHKG000000VS5489B5VT8CT2E0',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K0D1AHKG000000VS5489B5VT8CT2E0'
    },
    'text': null,
    'time': 13,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0CRUB9G000001VS5489B5VT8CT2E0/02K0D1AHKG000000VS5489B5VT8CT2E0/02IHFD2U04000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Zeitstrafe beendet Max Bachl-Staudinger (15)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTSN5T70000000VS5489B1VUGSQH17',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTSN5T70000000VS5489B1VUGSQH17'
    },
    'text': null,
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQO4SL0000001VS5489B6VTQROS91/02JTSN5T70000000VS5489B1VUGSQH17/02IHAAGF6S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Max Bachl-Staudinger (15)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTREU27G000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTREU27G000000VS5489B5VS0OTKFF'
    },
    'text': null,
    'time': 80,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQO4SL0000001VS5489B6VTQROS91/02JTREU27G000000VS5489B5VS0OTKFF/02IHAAGF6S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Max Bachl-Staudinger (15)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTRER1K4000000VS5489B7VSM4B3H8',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTRER1K4000000VS5489B7VSM4B3H8'
    },
    'text': null,
    'time': 80,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQOS5AK000001VS5489B7VSM4B3H8/02JTRER1K4000000VS5489B7VSM4B3H8/02IHAAGF6S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Sebastian Benesch (6)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JRJAD2HK000000VS5489B5VS1ODO3E',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JRJAD2HK000000VS5489B5VS1ODO3E'
    },
    'text': 'Foulspiel',
    'time': 98,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JRIDBJEC000001VS5489B6VT5VIU4B/02JRJAD2HK000000VS5489B5VS1ODO3E/02IHAAGFAC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Alexander Kautz (17)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JRJ9RPES000000VS5489B5VS1ODO3E',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JRJ9RPES000000VS5489B5VS1ODO3E'
    },
    'text': null,
    'time': 95,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JRIDBJEC000001VS5489B6VT5VIU4B/02JRJ9RPES000000VS5489B5VS1ODO3E/02IHAAGFAC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Stefan Hofner (19)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTJAH4V4000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTJAH4V4000000VS5489B5VS0OTKFF'
    },
    'text': null,
    'time': 77,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTIKD6DS000001VS5489B5VS0OTKFF/02JTJAH4V4000000VS5489B5VS0OTKFF/02IHAAGES8000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Tobias Gayring (23)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K037E9GG000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K037E9GG000000VS5489B6VV4DR9A5'
    },
    'text': null,
    'time': 61,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02KKPVS000001VS5489B5VT8CT2E0/02K037E9GG000000VS5489B6VV4DR9A5/02IHAAGDSC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Tobias Gayring (23)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K037E9GG000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K037E9GG000000VS5489B6VV4DR9A5'
    },
    'text': null,
    'time': 61,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02KKPVS000001VS5489B5VT8CT2E0/02K037E9GG000000VS5489B6VV4DR9A5/02IHAAGDSC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Michael Kraskov (29)',
    'type': 'time',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JRAC9NA8000000VS5489B6VT5VIU4B',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JRAC9NA8000000VS5489B6VT5VIU4B'
    },
    'text': null,
    'time': 55,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JR9PIPOC000001VS5489B6VT5VIU4B/02JRAC9NA8000000VS5489B6VT5VIU4B/02IHAAGG38000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zeitstrafe für Lukas Schätzl (21)',
    'type': 'time',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JMQ95P8S000000VS5489B6VSTLSK2I',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JMQ95P8S000000VS5489B6VSTLSK2I'
    },
    'text': null,
    'time': 72,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JMPI2GSO000001VS5489B5VVI9RBBH/02JMQ95P8S000000VS5489B6VSTLSK2I/02IHAAFQEC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Zuschauer*innenanzahl',
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BEMUGK000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BEMUGK000000VS5489B3VUVTC6K3'
    },
    'text': 'Es sind heute 4.500 Zuschauer*innen im Alpenbauer Sportpark Unterhaching.',
    'time': 75,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BEMUGK000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Hektik im Pipinsrieder Strafraum:',
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B0T5FC000000VS5489B4VVD074B6',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B0T5FC000000VS5489B4VVD074B6'
    },
    'text': 'Der Ball ist nach einem Würzburger Angriff im Tor, doch ein Handspiel ist vorausgegangen. Der Schiedsrichter erkundigt sich beim Assistenten, der die Wahrnehmung bestätigt. Die Würzburger sind außer sich und können es nicht fassen, dass das Tor nicht zählt.',
    'time': 35,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K24IITF4000001VS5489B5VT8CT2E0/02K2B0T5FC000000VS5489B4VVD074B6/02IFGQ2O6O000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tolle Unterstützung der Gästefans:',
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2APM0H4000000VS5489B4VVD074B6',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2APM0H4000000VS5489B4VVD074B6'
    },
    'text': 'Auch wenn die Anreise kein Katzensprung ist, aus Würzburg sind ca. 150 Fans mitgereist, die ihre Mannschaft lautstark anfeuern.',
    'time': 3,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K24IITF4000001VS5489B5VT8CT2E0/02K2APM0H4000000VS5489B4VVD074B6/02IFGQ2O6O000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Zuschauerzahl !!!',
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K035VCKC000000VS5489B8VVSIN1VH',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K035VCKC000000VS5489B8VVSIN1VH'
    },
    'text': 'Der Stadionsprecher bedankt sich bei 435 Zuschauer.',
    'time': 53,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JT4O67FK000001VS5489B4VUAKSJ6U/02K035VCKC000000VS5489B8VVSIN1VH/02IFGQ2P2S000000VS5489B4VUIHV7I0'
  },
  {
    'headline': null,
    'type': 'specialAction',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTRAK2KO000000VS5489B3VTJN61RV',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTRAK2KO000000VS5489B3VTJN61RV'
    },
    'text': 'Verwarnung für Trainer Cristian Fièl, der sich nach einem Pressschlag vor seinen Augen kaum mehr beruhigen kann.',
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTFE1P4K000001VS5489B1VUGSQH17/02JTRAK2KO000000VS5489B3VTJN61RV/02IFGQ2PN0000000VS5489B4VUIHV7I0'
  },
  {
    'headline': null,
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR7F984000000VS5489B3VTJN61RV',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR7F984000000VS5489B3VTJN61RV'
    },
    'text': '228 Zuschauer*innen haben heute den Weg an den Valznerweiher gefunden.',
    'time': 77,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTFE1P4K000001VS5489B1VUGSQH17/02JTR7F984000000VS5489B3VTJN61RV/02IFGQ2PN0000000VS5489B4VUIHV7I0'
  },
  {
    'headline': null,
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQT01LS000000VS5489B3VTJN61RV',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQT01LS000000VS5489B3VTJN61RV'
    },
    'text': 'Muteba hätte sich nach feinem Zuspiel durch die Mitte eine tolle Chance erarbeiten können. Die Ballannahme misslingt allerdings komplett, sodass lediglich eine weitere Ecke dabei herausspringt, die nichts einbringt.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTFE1P4K000001VS5489B1VUGSQH17/02JTQT01LS000000VS5489B3VTJN61RV/02IFGQ2PN0000000VS5489B4VUIHV7I0'
  },
  {
    'headline': null,
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQO630C000000VS5489B3VTJN61RV',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQO630C000000VS5489B3VTJN61RV'
    },
    'text': 'Gefährliche Situation nun auf der anderen Seite:  Langhans setzt sich auf der rechten Seite durch und bringt von der Grundlinie eine scharfe Hereingabe vor das Tor. Der Ball rauscht allerdings an Freund und Feind vorbei ins Seitenaus.',
    'time': 25,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTFE1P4K000001VS5489B1VUGSQH17/02JTQO630C000000VS5489B3VTJN61RV/02IFGQ2PN0000000VS5489B4VUIHV7I0'
  },
  {
    'headline': null,
    'type': 'specialAction',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JKEK90000000VS5489B8VVPPHI0N',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JKEK90000000VS5489B8VVPPHI0N'
    },
    'text': 'Ein Wacker-Verteidiger klärt gegen Benedict Laverty auf der Linie.',
    'time': 87,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K122Q2RS000000VS5489B7VVD8F40G/02K4JKEK90000000VS5489B8VVPPHI0N/02IFGQ2LVG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Doppelchance für den 1. FC Schweinfurt 05:',
    'type': 'specialAction',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4J11TC0000000VS5489B7VT5G2Q40',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4J11TC0000000VS5489B7VT5G2Q40'
    },
    'text': 'Zunächst scheitert Ivan Mihaljevic am stark reagierenden Marcel Lubik im Tor des FCA. Dann folgt ein Gewaltschuss aus 20 Metern, von Felix Schwarzholz, der jedoch einen guten Meter über die Latte fliegt.',
    'time': 21,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2B53828000001VS5489B6VV4DR9A5/02K4J11TC0000000VS5489B7VT5G2Q40/02IFGQ2N0O000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Simon Skarlatidis (30)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2AU7BD4000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2AU7BD4000000VS5489B3VUVTC6K3'
    },
    'text': 'Aus zentraler Position.',
    'time': 21,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2AU7BD4000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Simon Skarlatidis (30)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2ARRIUO000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2ARRIUO000000VS5489B3VUVTC6K3'
    },
    'text': 'Von der linken Seite.',
    'time': 11,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2ARRIUO000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Daniel Haubner (28)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4J50818000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4J50818000000VS5489B5VUU0HQ6C'
    },
    'text': 'Aus dem Mittelfeld kommt der Freistoß von Danioel Haubner in den Strafraum und Philipp Federl bekommt den Ball nicht unter Kontrolle und verzieht über das Tor. Das war die Chance zum Ausgleich.',
    'time': 36,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0LATLOG000001VS5489B2VUE0KJBN/02K4J50818000000VS5489B5VUU0HQ6C/02IFGQ2MEG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß für VfB Eichstätt',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4J2H4I0000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4J2H4I0000000VS5489B5VUU0HQ6C'
    },
    'text': 'Der Freistoß aus dem Mittelfeld wird von der Kickers Abwehr geklärt.',
    'time': 28,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0LATLOG000001VS5489B2VUE0KJBN/02K4J2H4I0000000VS5489B5VUU0HQ6C/02IFGQ2MEG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Ivan Franjic (17)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4IT2JEO000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4IT2JEO000000VS5489B5VUU0HQ6C'
    },
    'text': 'Der Freistoß von Ivan Franjic aus 25 Meter wird von Felix Junghan weggeboxt.',
    'time': 2,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0LATLOG000001VS5489B2VUE0KJBN/02K4IT2JEO000000VS5489B5VUU0HQ6C/02IFGQ2MEG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Halit Yilmaz (11)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B33J00000000VS5489B4VVD074B6',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B33J00000000VS5489B4VVD074B6'
    },
    'text': 'Vom linken Strafraumeck probiert es Yilmaz direkt. Er schickt einen gefährlichen Flatterball zentral auf das Tor. Marc Richter kann den Schuss zur Seite abwehren.',
    'time': 44,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K24IITF4000001VS5489B5VT8CT2E0/02K2B33J00000000VS5489B4VVD074B6/02IFGQ2O6O000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Enrique Katsianas-Sanchez (11)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JBVOE4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JBVOE4000000VS5489B4VV4Q42OO'
    },
    'text': 'Die Mauer lenkt den Ball zur Ecke.',
    'time': 55,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4JBVOE4000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Arif Ekin (24)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4J637CK000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4J637CK000000VS5489B4VV4Q42OO'
    },
    'text': 'Arif Ekin wird von Jannik Hofmann auf der rechten Seite per Foul gestoppt. Den fälligen Freistoß klart die Abwehr des Club.',
    'time': 43,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4J637CK000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Christopher Wähling (10)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4IVQIA0000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4IVQIA0000000VS5489B4VV4Q42OO'
    },
    'text': 'Der Freistoß von der linken Seite landet sicher in den Armen von Fabian Eutinger.',
    'time': 16,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4IVQIA0000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Freistoß durch Sebastian Bracher (10)',
    'type': 'freeKick',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02KP6QH56K000000VS5489B6VVCBFAFQ',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02KP6QH56K000000VS5489B6VVCBFAFQ'
    },
    'text': null,
    'time': 66,
    'reportLink': 'https://www.bfv.de/ticker/melden/02KP68853S000001VS5489B5VTSJR9P9/02KP6QH56K000000VS5489B6VVCBFAFQ/02J4M3BEVO000000VS5489B4VUCFO0CO'
  },
  {
    'headline': 'Torschuss durch Mohamad Awata (70)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B6G6K4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B6G6K4000000VS5489B4VV4Q42OO'
    },
    'text': 'Wieder fasst sich Mo Awate ein Herz und zieht aus 18 Metern ab. Der Ball fliegt aber genau in die Arme von Fabian Scherger. Ein Treffer für Heimstetten wäre nicht unverdient.',
    'time': 73,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B6G6K4000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Mohamad Awata (70)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B2JCVC000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B2JCVC000000VS5489B4VV4Q42OO'
    },
    'text': 'Gute Möglichkeit zum Anschlusstreffer durch Mo Awata. Über die rechte Seite kommt ein flacher Ball in den Strafraum auf den komplett freistehenden Stürmer. Dieser trifft den Ball aber nicht richtig und vergibt die Chance.',
    'time': 56,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B2JCVC000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Robert Manole (8)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B1CUPO000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B1CUPO000000VS5489B4VV4Q42OO'
    },
    'text': 'Nun kommt auch der zweite neue Mann zum Abschluss. Aus knapp 20 Metern zieht Robert Manole ab, aber der Ball ist eine sichere Beute für Torwart Fabian Scherger.',
    'time': 52,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B1CUPO000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Ben Biton (25)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B0TMO0000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B0TMO0000000VS5489B4VV4Q42OO'
    },
    'text': 'Schnell vorgetragener Konter der Hausherren. An der Strafraumgrenze kommt Ben Biton zum Abschluss, aber der Ball geht knapp am linken Pfosten vorbei.',
    'time': 50,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B0TMO0000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Mathias Fetsch (11)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AP692S000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AP692S000000VS5489B4VV4Q42OO'
    },
    'text': 'Nach einem Freistoß von der linken Seite steigt Mathias Fetsch am höchsten und köpft Richtung Heimstettner Tor. SVH-Keeper Maxi Riedmüller kann den Ball mit einer schönen Parade über die Latte lenken. Eckball!',
    'time': 37,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AP692S000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Patrick Hobsch (34)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AKI328000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AKI328000000VS5489B4VV4Q42OO'
    },
    'text': 'Nach einer Flanke von der rechten Seite kommt Patrick Hobsch zum Kopfball, kann aber nicht genügend Druck hinter den Ball bringen.',
    'time': 18,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AKI328000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Daniel Hausmann (43)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BIBQ68000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BIBQ68000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 92,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BIBQ68000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Daniel Hausmann (43)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BGGNJG000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BGGNJG000000VS5489B3VUVTC6K3'
    },
    'text': 'Knapp am linken Pfosten vorbei.',
    'time': 84,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BGGNJG000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch Christoph Ehlich (33)',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BG4KT8000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BG4KT8000000VS5489B3VUVTC6K3'
    },
    'text': 'Christoph Ehlich mit der dicksten Chance im ganzen Spiel. Super Flankenball, und dann hat Ehlich nur noch Keeper Daniel Klein vor sich und trifft aus kurzer Distanz nur den Pfosten. Der muss rein. Großes Raunen im Sportpark vor 4.500 Zuschauer*innen.',
    'time': 81,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BG4KT8000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Torschuss durch FC Augsburg II',
    'type': 'shotOnGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BFD1B0000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BFD1B0000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 79,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BFD1B0000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Niclas Anspach (18)',
    'team': 'away',
    'player': {
      'id': '00QBTFDAVO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Niclas Anspach',
      'number': 18
    },
    'result': {
      'home': 0,
      'away': 3
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AMQ00O000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AMQ00O000000VS5489B4VV4Q42OO'
    },
    'text': 'Super Kombination über die linke Seite. Mashigo Boipelo steckt den Ball auf Christoph Ehlich durch, der den Ball im Strafraum quer auf Niclas Anspach spielt. Dieser nimmt den Ball direkt und der Ball schlägt unten rechts im Tor ein.',
    'time': 28,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AMQ00O000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Mathias Fetsch (11)',
    'team': 'away',
    'player': {
      'id': '00NKAT7PHC000000VV0AG85VVUH1CIQU',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Mathias Fetsch',
      'number': 11
    },
    'result': {
      'home': 0,
      'away': 2
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 3,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4ALNH70000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4ALNH70000000VS5489B4VV4Q42OO'
    },
    'text': 'Mathias Fetsch läuft diagonal zur Strafraumgrenze und zieht ab. Keine Chance für Torwart Maxi Riedmüller.',
    'time': 24,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4ALNH70000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Mathias Fetsch (11)',
    'team': 'home',
    'player': {
      'id': '00NKAT7PHC000000VV0AG85VVUH1CIQU',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Mathias Fetsch',
      'number': 11
    },
    'result': {
      'home': 1,
      'away': 0
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BHC07K000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BHC07K000000VS5489B3VUVTC6K3'
    },
    'text': 'Langer Ball von Keeper Rene Vollath, Mathias Fetsch rennt durch, bekommt im Strafraum den Ball und versenkt eiskalt links unten.',
    'time': 87,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BHC07K000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Simon Skarlatidis (30)',
    'team': 'away',
    'player': {
      'id': '00Q5Q9SCV8000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Simon Skarlatidis',
      'number': 30
    },
    'result': {
      'home': 3,
      'away': 3
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03BQGTG000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03BQGTG000000VS5489B3VUVTC6K3'
    },
    'text': 'Das ist der Ausgleich zum 3:3! Schöne Vorlage von Krattenmacher auf Skarlatidis, dieser schießt unhaltbar zum Ausgleich ins Tor.',
    'time': 75,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03BQGTG000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Niclas Anspach (18)',
    'team': 'away',
    'player': {
      'id': '00QBTFDAVO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Niclas Anspach',
      'number': 18
    },
    'result': {
      'home': 3,
      'away': 2
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K039PL6O000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K039PL6O000000VS5489B3VUVTC6K3'
    },
    'text': 'Da ist erneut der Anschlußtreffer der Gäste. Nachdem Zok noch zweimal super gegen Fetsch retten konnte, war es letztlich Anspach der den Ball aus dem Getümmel ins Tor schießt. Die Partie ist wieder offen!',
    'time': 66,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K039PL6O000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Hannes Pöschl (23)',
    'team': 'home',
    'player': {
      'id': '00Q5QHB18G000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Hannes Pöschl',
      'number': 23
    },
    'result': {
      'home': 3,
      'away': 1
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 3,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03135RO000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03135RO000000VS5489B3VUVTC6K3'
    },
    'text': 'Postwendend erzielt der FVI das 3:1. Wieder überlistet Pöschl die Abwehr von Haching und schiebt an Torwart  Vollath vorbei den Ball ins Netz, Schwabl gibt dem Ball noch den letzten entscheidenden Richtungswechsel.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03135RO000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Manuel Stiefler (8)',
    'team': 'away',
    'player': {
      'id': '00QBTBKNBG000000VV0AG819VSPRME8B',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Manuel Stiefler',
      'number': 8
    },
    'result': {
      'home': 2,
      'away': 1
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K030F6U0000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K030F6U0000000VS5489B3VUVTC6K3'
    },
    'text': 'Da ist der Anschlußtreffer für Haching. Nach einer Ecke kommt aus zu einem Gestocher vor dem Tor des FVI, Stiefler drückt dann letztendlich den Ball aus wenigen Metern über die Linie.',
    'time': 44,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K030F6U0000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Yannick Glessing (21)',
    'team': 'home',
    'player': {
      'id': '00T6885PC4000000VV0AG80NVTQIGFT0',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Yannick Glessing',
      'number': 21
    },
    'result': {
      'home': 2,
      'away': 0
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 3,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02TBTG4000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02TBTG4000000VS5489B3VUVTC6K3'
    },
    'text': 'Toooor für den FVI!!! Glessing erhöht auf 2:0! Nach einem Konter schließt Glessing eiskalt aus kurzer Distanz ab.',
    'time': 31,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K02TBTG4000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Hannes Pöschl (23)',
    'team': 'home',
    'player': {
      'id': '00Q5QHB18G000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Hannes Pöschl',
      'number': 23
    },
    'result': {
      'home': 1,
      'away': 0
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 5,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02MTNEC000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02MTNEC000000VS5489B3VUVTC6K3'
    },
    'text': 'Toooor für den FVI!!! Das ging schnell. Nach einem Fehler in der Hachinger Abwehr stiehlt Glessing den Ball und schießt aufs Tor, Vollath kann abwehren aber direkt vor die Füße von Pöschl, dieser schiebt souverän aus 14 Metern ein.',
    'time': 2,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K02MTNEC000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Tor durch Tim Littmann (31)',
    'team': 'home',
    'player': {
      'id': '016H6SHNTO000000VV0AG811VSPMN858',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Tim Littmann',
      'number': 31
    },
    'result': {
      'home': 3,
      'away': 1
    },
    'type': 'goal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JKQKSK000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JKQKSK000000VS5489B5VUU0HQ6C'
    },
    'text': 'Das Kopfballtor des eingewechselte Littmann stellt den alten zwei Tore Abstand wieder her.',
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0LATLOG000001VS5489B2VUE0KJBN/02K4JKQKSK000000VS5489B5VUU0HQ6C/02IFGQ2MEG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Patrick Hobsch (34)',
    'team': 'away',
    'player': {
      'id': '00QBSH0KFO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Patrick Hobsch',
      'number': 34
    },
    'result': {
      'home': 3,
      'away': 4
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 4,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03F7338000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03F7338000000VS5489B3VUVTC6K3'
    },
    'text': 'Da ist doch noch das 3:4. Patrick Hobsch verwandelt den Elfer eiskalt unter die Latte.',
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03F7338000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Arif Ekin (24)',
    'team': 'home',
    'player': {
      'id': '00QBSPUSA4000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Arif Ekin',
      'number': 24
    },
    'result': {
      'home': 2,
      'away': 1
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JIHU3K000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JIHU3K000000VS5489B4VV4Q42OO'
    },
    'text': 'Arif Ekin verwandelt sicher.',
    'time': 84,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4JIHU3K000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Leonardo Vonic (23)',
    'team': 'away',
    'player': {
      'id': '0149O33CB4000000VV0AG80NVS243I77',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Leonardo Vonic',
      'number': 23
    },
    'result': {
      'home': 0,
      'away': 1
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JGF698000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JGF698000000VS5489B4VV4Q42OO'
    },
    'text': 'Leonardo Vonic verwandelt sicher.',
    'time': 74,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K0F8KFLC000001VS5489B6VSUH5K1R/02K4JGF698000000VS5489B4VV4Q42OO/02IFGQ2MMS000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Thomas Winklbauer (21)',
    'team': 'home',
    'player': {
      'id': '00QBTE7UQK000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Thomas Winklbauer',
      'number': 21
    },
    'result': {
      'home': 1,
      'away': 1
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JM6NO4000000VS5489B8VVPPHI0N',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JM6NO4000000VS5489B8VVPPHI0N'
    },
    'text': 'Der gefoulte Thomas Winklbauer tritt selber an. Er setzt den Ball an den linken Innenpfosten, von wo der Ball zum Ausgleich ins Tor springt.',
    'time': 95,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K122Q2RS000000VS5489B7VVD8F40G/02K4JM6NO4000000VS5489B8VVPPHI0N/02IFGQ2LVG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Benjamin Baier (10)',
    'team': 'away',
    'player': {
      'id': '00QBRTDVU4000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Benjamin Baier',
      'number': 10
    },
    'result': {
      'home': 0,
      'away': 1
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 4,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4IVAHH0000000VS5489B8VVPPHI0N',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4IVAHH0000000VS5489B8VVPPHI0N'
    },
    'text': 'Aus seiner Sicht verwandelt Benjamin Baier sicher ins linke untere Toreck.',
    'time': 13,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K122Q2RS000000VS5489B7VVD8F40G/02K4IVAHH0000000VS5489B8VVPPHI0N/02IFGQ2LVG000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Adam Jabiri (27)',
    'team': 'away',
    'player': {
      'id': '00QBRRTKQK000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Adam Jabiri',
      'number': 27
    },
    'result': {
      'home': 0,
      'away': 2
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K035R3TK000000VS5489B4VVD074B6',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K035R3TK000000VS5489B4VVD074B6'
    },
    'text': 'Der Gefoulte tritt selbst an, verlädt TSV-Keeper Andre Esch und schiebt flach ins rechte Eck ein.',
    'time': 54,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02CJR8G000001VS5489B4VVD074B6/02K035R3TK000000VS5489B4VVD074B6/02IFGQ2PF4000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Timo Kern (10)',
    'team': 'home',
    'player': {
      'id': '00NKAU4HVS000000VV0AG85VVUH1CIQU',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Timo Kern',
      'number': 10
    },
    'result': {
      'home': 3,
      'away': 0
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B7FDAS000000VS5489B5VUU0HQ6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B7FDAS000000VS5489B5VUU0HQ6C'
    },
    'text': 'Der Spielführer schnappt sich selbstbewusst die Pille und schiebt diese humorlos halbhoch in Vilzinger Tornetz. Das könnte nun bereits die Vorentscheidung im Spiel der Bayern sein, da auch ihr Gegner bislang keine offensichtlichen Anstalten macht, nach vorn mehr zu machen.',
    'time': 59,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2VM625C000000VS5489B7VVD8F40G/02K4B7FDAS000000VS5489B5VUU0HQ6C/02IFGQ2M38000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Thomas Stowasser (27)',
    'team': 'home',
    'player': {
      'id': '00QBT991OS000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Thomas Stowasser',
      'number': 27
    },
    'result': {
      'home': 3,
      'away': 0
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQRBJM4000000VS5489B1VUGSQH17',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQRBJM4000000VS5489B1VUGSQH17'
    },
    'text': 'FCA-Keeper Leineis fliegt ins linke Eck, Stowasser knallt den Ball halbhoch ins rechte Eck.',
    'time': 39,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JSISJB94000001VS5489B3VTJN61RV/02JTQRBJM4000000VS5489B1VUGSQH17/02IFGQ2QAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Arif Ekin (24)',
    'team': 'away',
    'player': {
      'id': '00QBSPUSA4000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Arif Ekin',
      'number': 24
    },
    'result': {
      'home': 3,
      'away': 2
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BGJOL0000000VS5489B8VVSIN1VH',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BGJOL0000000VS5489B8VVSIN1VH'
    },
    'text': 'Sicher verwandelt.',
    'time': 84,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2A56TDS000001VS5489B8VVSIN1VH/02K2BGJOL0000000VS5489B8VVSIN1VH/02IFGQ2N4G000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Strafstoßtor durch Philipp Hack (7)',
    'team': 'away',
    'player': {
      'id': '011Q85K6RS000000VV0AG811VVCD89UM',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Philipp Hack',
      'number': 7
    },
    'result': {
      'home': 1,
      'away': 1
    },
    'type': 'penaltyGoal',
    'resultLikes': {
      'likes': 6,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K23AO390000000VS5489B6VV4DR9A5',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K23AO390000000VS5489B6VV4DR9A5'
    },
    'text': null,
    'time': 83,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K22H9EJ4000001VS5489B5VT8CT2E0/02K23AO390000000VS5489B6VV4DR9A5/02IFIGPVSC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Leonard Grob (40) für Patrick Hobsch (34)',
    'team': 'away',
    'playerIn': {
      'id': '00S6KF8U80000000VV0AG80NVTI1GQJD',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Leonard Grob',
      'number': 40
    },
    'playerOut': {
      'id': '00QBSH0KFO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Patrick Hobsch',
      'number': 34
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B8AO54000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B8AO54000000VS5489B4VV4Q42OO'
    },
    'text': null,
    'time': 83,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B8AO54000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Sandro Porta (7) für Mathias Fetsch (11)',
    'team': 'away',
    'playerIn': {
      'id': '010004J0P4000000VV0AG80NVU29ORDR',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Sandro Porta',
      'number': 7
    },
    'playerOut': {
      'id': '00NKAT7PHC000000VV0AG85VVUH1CIQU',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Mathias Fetsch',
      'number': 11
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B7NQC4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B7NQC4000000VS5489B4VV4Q42OO'
    },
    'text': null,
    'time': 81,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B7NQC4000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Florian Schmid (31) für Simon Skarlatidis (30)',
    'team': 'away',
    'playerIn': {
      'id': '00QRFTR600000000VV0AG83KVUE21VIT',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Florian Schmid',
      'number': 31
    },
    'playerOut': {
      'id': '00Q5Q9SCV8000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Simon Skarlatidis',
      'number': 30
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B6MH8S000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B6MH8S000000VS5489B4VV4Q42OO'
    },
    'text': null,
    'time': 76,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B6MH8S000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Sebastian Burke (29) für Reza Sakhi Zada (6)',
    'team': 'home',
    'playerIn': {
      'id': '02164VK6JG000000VS54898GVUIPK31D',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Sebastian Burke',
      'number': 29
    },
    'playerOut': {
      'id': '016SFLN3KK000000VV0AG811VSFK1A39',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Reza Sakhi Zada',
      'number': 6
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B55FRC000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B55FRC000000VS5489B4VV4Q42OO'
    },
    'text': null,
    'time': 69,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B55FRC000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Viktor Zentrich (2) für Niclas Anspach (18)',
    'team': 'away',
    'playerIn': {
      'id': '01M143NJCC000000VV0AG80NVSI4B8FE',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Viktor Zentrich',
      'number': 2
    },
    'playerOut': {
      'id': '00QBTFDAVO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Niclas Anspach',
      'number': 18
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B4EU94000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B4EU94000000VS5489B4VV4Q42OO'
    },
    'text': 'Zweiter Wechsel bei Haching.',
    'time': 66,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B4EU94000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Sebastian Maier (10) für Maximilian Welzmüller (19)',
    'team': 'away',
    'playerIn': {
      'id': '01ABJIO6U4000000VV0AG811VUP4IALO',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Sebastian Maier',
      'number': 10
    },
    'playerOut': {
      'id': '00QBS234IO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Maximilian Welzmüller',
      'number': 19
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B3N8T4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B3N8T4000000VS5489B4VV4Q42OO'
    },
    'text': 'Erster Wechsel bei den Gästen.',
    'time': 62,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B3N8T4000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Ben Biton (25) für Alexis Fambo (32)',
    'team': 'home',
    'playerIn': {
      'id': '012I1CTUPG000000VV0AG80NVSN933FP',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Ben Biton',
      'number': 25
    },
    'playerOut': {
      'id': '010AV00OOG000000VV0AG811VTGVH5ON',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Alexis Fambo',
      'number': 32
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4B007O4000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4B007O4000000VS5489B4VV4Q42OO'
    },
    'text': 'Doppelwechsel zur Halbzeit bei den Hausherren.',
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4B007O4000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Robert Manole (8) für Lukas Riglewski (22)',
    'team': 'home',
    'playerIn': {
      'id': '013N3MJT1G000000VV0AG811VTES4D64',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Robert Manole',
      'number': 8
    },
    'playerOut': {
      'id': '00QBSKJJOO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Lukas Riglewski',
      'number': 22
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AVOFC8000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AVOFC8000000VS5489B4VV4Q42OO'
    },
    'text': null,
    'time': 46,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AVOFC8000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Leonard Grob (40) für Maurice Krattenmacher (17)',
    'team': 'home',
    'playerIn': {
      'id': '00S6KF8U80000000VV0AG80NVTI1GQJD',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Leonard Grob',
      'number': 40
    },
    'playerOut': {
      'id': '01AII7CKJ8000000VV0AG811VVUO230N',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Maurice Krattenmacher',
      'number': 17
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BI34C4000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BI34C4000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BI34C4000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Florian Schmid (31) für Niclas Anspach (18)',
    'team': 'home',
    'playerIn': {
      'id': '00QRFTR600000000VV0AG83KVUE21VIT',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Florian Schmid',
      'number': 31
    },
    'playerOut': {
      'id': '00QBTFDAVO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Niclas Anspach',
      'number': 18
    },
    'type': 'substitute',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BHSJV8000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BHSJV8000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 89,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BHSJV8000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Lukas Riglewski (22)',
    'team': 'home',
    'player': {
      'id': '00QBSKJJOO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Lukas Riglewski',
      'number': 22
    },
    'entries': {
      'games': 22,
      'goals': 7,
      'yellowCards': 2,
      'secondYellowCards': 0,
      'redCards': 0
    },
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AQO0O8000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AQO0O8000000VS5489B4VV4Q42OO'
    },
    'text': 'Nach einem harten Einsteigen auf Höhe der Mittellinie gibt es erst eine kleine Rudelbildung und dann Gelb für den Kapitän.',
    'time': 45,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AQO0O8000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Sandro Sengersdorf (16)',
    'team': 'home',
    'player': {
      'id': '00QBTCN9A8000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Sandro Sengersdorf',
      'number': 16
    },
    'entries': {
      'games': 17,
      'goals': 1,
      'yellowCards': 3,
      'secondYellowCards': 0,
      'redCards': 0
    },
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AJ4D44000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AJ4D44000000VS5489B4VV4Q42OO'
    },
    'text': 'Direkt vor der eigenen Auswechselbank fällt Sandro Sengersdorf seinen Gegenspieler und sieht zurecht Gelb.',
    'time': 11,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AJ4D44000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Jasper Maljojoki (5)',
    'team': 'home',
    'player': {
      'id': '00SAHPL7TC000000VV0AG811VTP102JQ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Jasper Maljojoki',
      'number': 5
    },
    'entries': {
      'games': 18,
      'goals': 0,
      'yellowCards': 5,
      'secondYellowCards': 0,
      'redCards': 0
    },
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AIINIO000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AIINIO000000VS5489B4VV4Q42OO'
    },
    'text': 'Und weiter geht es mit den Verwarnungen. Jasper Maljojoki steigt in der Nähe der Mittellinie sehr hart ein und kassiert Gelb.',
    'time': 9,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AIINIO000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Markus Schwabl (23)',
    'team': 'away',
    'player': {
      'id': '00KCJ25I0C000000VV0AG83KVUPEJPGB',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Markus Schwabl',
      'number': 23
    },
    'entries': null,
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 2,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AIA1NK000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AIA1NK000000VS5489B4VV4Q42OO'
    },
    'text': 'Markus Schwabl geht auf den Foulspieler Fabio Sabbagh los und erhält ebenfalls die gelbe Karte.',
    'time': 5,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AIA1NK000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Fabio Sabbagh (17)',
    'team': 'home',
    'player': {
      'id': '00QBT0UFE0000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Fabio Sabbagh',
      'number': 17
    },
    'entries': {
      'games': 7,
      'goals': 0,
      'yellowCards': 4,
      'secondYellowCards': 0,
      'redCards': 0
    },
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4AHTLTK000000VS5489B4VV4Q42OO',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4AHTLTK000000VS5489B4VV4Q42OO'
    },
    'text': 'Kurz vor dem Strafraum geht Fabio Sabbagh etwas ungestüm gegen Boipelo Mashigo vor und erhält die gelbe Karte',
    'time': 5,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4AC0TOC000000VS5489B4VV4Q42OO/02K4AHTLTK000000VS5489B4VV4Q42OO/02IFGQ2LRO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Hendrik Hofgärtner (28)',
    'team': 'away',
    'player': {
      'id': '00Q5QH83TC000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Hendrik Hofgärtner',
      'number': 28
    },
    'entries': {
      'games': 21,
      'goals': 6,
      'yellowCards': 3,
      'secondYellowCards': 0,
      'redCards': 0
    },
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2BANA6K000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2BANA6K000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 58,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2BANA6K000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Maximilian Welzmüller (19)',
    'team': 'home',
    'player': {
      'id': '00QBS234IO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Maximilian Welzmüller',
      'number': 19
    },
    'entries': null,
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K2B281GS000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K2B281GS000000VS5489B3VUVTC6K3'
    },
    'text': null,
    'time': 39,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JVE1HPLG000001VS5489B5VSO997EM/02K2B281GS000000VS5489B3VUVTC6K3/02IFGQ2NRC000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Timon Obermeier (15)',
    'team': 'away',
    'player': {
      'id': '00VGRU2KLS000000VV0AG80NVSS49TAG',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Timon Obermeier',
      'number': 15
    },
    'entries': null,
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03FMAPC000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03FMAPC000000VS5489B3VUVTC6K3'
    },
    'text': 'Gelbe Karte wegen Foulspiel.',
    'time': 92,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K03FMAPC000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Yannick Glessing (21)',
    'team': 'home',
    'player': {
      'id': '00T6885PC4000000VV0AG80NVTQIGFT0',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Yannick Glessing',
      'number': 21
    },
    'entries': null,
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K035Q2E4000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K035Q2E4000000VS5489B3VUVTC6K3'
    },
    'text': 'Gelbe Karte wegen Unsportlichkeit.',
    'time': 49,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K035Q2E4000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelbe Karte für Markus Schwabl (23)',
    'team': 'away',
    'player': {
      'id': '00KCJ25I0C000000VV0AG83KVUPEJPGB',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Markus Schwabl',
      'number': 23
    },
    'entries': null,
    'type': 'yellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02US38G000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02US38G000000VS5489B3VUVTC6K3'
    },
    'text': 'Gelbe Karte wegen Foulspiel.',
    'time': 38,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K02US38G000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelb-Rote Karte für Maurice Strobel (12)',
    'team': 'home',
    'player': {
      'id': '00Q5QGC524000000VV0AG85VVV05E0NJ',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Maurice Strobel',
      'number': 12
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K036O058000000VS5489B3VUVTC6K3',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K036O058000000VS5489B3VUVTC6K3'
    },
    'text': 'Platzverweis für Maurice Strobel nach wiederholtem Foulspiel.',
    'time': 53,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS88U4A4000001VS5489B4VUAKSJ6U/02K036O058000000VS5489B3VUVTC6K3/02IFGQ2OAO000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelb-Rote Karte für Moritz Sommerauer (35)',
    'team': 'away',
    'player': {
      'id': '01A79C5CN8000000VV0AG811VV0EIA42',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Moritz Sommerauer',
      'number': 35
    },
    'entries': {
      'games': 16,
      'goals': 2,
      'yellowCards': 5,
      'secondYellowCards': 1,
      'redCards': 0
    },
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JRIQB1AG000000VS5489B4VUAKSJ6U',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JRIQB1AG000000VS5489B4VUAKSJ6U'
    },
    'text': 'Nach dem Freistoßpfiff schießt er Sebastian Grassl noch an. Schiedsrichter Assad Nouhoum zückt erst gelb, dann gelb-rot.',
    'time': 92,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JNVFDL0G000000VS5489B3VUVSAVBV/02JRIQB1AG000000VS5489B4VUAKSJ6U/02IFGQ1S9S000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelb-Rote Karte für Reza Sakhi Zada (6)',
    'team': 'home',
    'player': {
      'id': '016SFLN3KK000000VV0AG811VSFK1A39',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Reza Sakhi Zada',
      'number': 6
    },
    'entries': {
      'games': 18,
      'goals': 0,
      'yellowCards': 8,
      'secondYellowCards': 1,
      'redCards': 0
    },
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K03CQ038000000VS5489B6VSUH5K1R',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K03CQ038000000VS5489B6VSUH5K1R'
    },
    'text': 'Foulspiel',
    'time': 86,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JS78OR6S000001VS5489B6VS3F3RJ1/02K03CQ038000000VS5489B6VSUH5K1R/02IFGQ2OI8000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Gelb-Rote Karte für Nicolai Oppelt (22)',
    'team': 'away',
    'player': {
      'id': '0137UMI5QC000000VV0AG811VT42BEI9',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Nicolai Oppelt',
      'number': 22
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR7544S000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR7544S000000VS5489B5VS0OTKFF'
    },
    'text': 'Felix Reusch wirft auf Matthias Wächter ab, der legt auf Schulik ab der wäre durch gewesen und wird gelegt. Chance verhindert, war aber nicht letzter Mann',
    'time': 74,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQEKUGC000001VS5489B5VS0OTKFF/02JTR7544S000000VS5489B5VS0OTKFF/02IFIGQ17S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Nicolai Oppelt (22)',
    'team': 'away',
    'player': {
      'id': '0137UMI5QC000000VV0AG811VT42BEI9',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Nicolai Oppelt',
      'number': 22
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR6TT54000000VS5489B6VTQROS91',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR6TT54000000VS5489B6VTQROS91'
    },
    'text': null,
    'time': 73,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTN46344000001VS5489B6VTQROS91/02JTR6TT54000000VS5489B6VTQROS91/02IFIGQ17S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Nicolai Oppelt (22)',
    'team': 'away',
    'player': {
      'id': '0137UMI5QC000000VV0AG811VT42BEI9',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Nicolai Oppelt',
      'number': 22
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR7544S000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR7544S000000VS5489B5VS0OTKFF'
    },
    'text': 'Felix Reusch wirft auf Matthias Wächter ab, der legt auf Schulik ab der wäre durch gewesen und wird gelegt. Chance verhindert, war aber nicht letzter Mann',
    'time': 74,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQEKUGC000001VS5489B5VS0OTKFF/02JTR7544S000000VS5489B5VS0OTKFF/02IFIGQ17S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Nicolai Oppelt (22)',
    'team': 'away',
    'player': {
      'id': '0137UMI5QC000000VV0AG811VT42BEI9',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Nicolai Oppelt',
      'number': 22
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR6TT54000000VS5489B6VTQROS91',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR6TT54000000VS5489B6VTQROS91'
    },
    'text': null,
    'time': 73,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTN46344000001VS5489B6VTQROS91/02JTR6TT54000000VS5489B6VTQROS91/02IFIGQ17S000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Xaver Müller (21)',
    'team': 'home',
    'player': {
      'id': '00QBTDCBIC000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Xaver Müller',
      'number': 21
    },
    'entries': {
      'games': 19,
      'goals': 1,
      'yellowCards': 4,
      'secondYellowCards': 1,
      'redCards': 0
    },
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTR3P7I8000000VS5489B6VS3F3RJ1',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTR3P7I8000000VS5489B6VS3F3RJ1'
    },
    'text': null,
    'time': 60,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQ8M3JO000001VS5489B1VUGSQH17/02JTR3P7I8000000VS5489B6VS3F3RJ1/02IFIGQ1DG000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Jannik Feidel (20)',
    'team': 'away',
    'player': {
      'id': '00QBSSGPB0000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Jannik Feidel',
      'number': 20
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTRA09U4000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTRA09U4000000VS5489B5VS0OTKFF'
    },
    'text': null,
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQH2LP4000001VS5489B5VS0OTKFF/02JTRA09U4000000VS5489B5VS0OTKFF/02IFIGQ15C000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Gelb-Rote Karte für Jannik Feidel (20)',
    'team': 'away',
    'player': {
      'id': '00QBSSGPB0000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Jannik Feidel',
      'number': 20
    },
    'entries': null,
    'type': 'secondYellowCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTRA09U4000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTRA09U4000000VS5489B5VS0OTKFF'
    },
    'text': null,
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQH2LP4000001VS5489B5VS0OTKFF/02JTRA09U4000000VS5489B5VS0OTKFF/02IFIGQ15C000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Adam Jabiri (27)',
    'team': 'home',
    'player': {
      'id': '00QBRRTKQK000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Adam Jabiri',
      'number': 27
    },
    'entries': {
      'games': 20,
      'goals': 17,
      'yellowCards': 7,
      'secondYellowCards': 0,
      'redCards': 1
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K6RHJQ6O000000VS5489B1VTKT0UD4',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K6RHJQ6O000000VS5489B1VTKT0UD4'
    },
    'text': 'Nach einem Foulspiel im Mittelfeld an Alexis Fambo, bekommt Adam Jabiri die Rote Kate gezeigt.\n\nNeuer Kapitän ist jetzt Lukas Billick.',
    'time': 63,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2JGQPJO000001VS5489B8VVSIN1VH/02K6RHJQ6O000000VS5489B1VTKT0UD4/02IFGQ2L94000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Rote Karte für Halit Yilmaz (11)',
    'team': 'away',
    'player': {
      'id': '011HH2AQ2O000000VV0AG80NVV3499AR',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Halit Yilmaz',
      'number': 11
    },
    'entries': {
      'games': 16,
      'goals': 7,
      'yellowCards': 2,
      'secondYellowCards': 0,
      'redCards': 1
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JERC80000000VS5489B2VVTR1AKQ',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JERC80000000VS5489B2VVTR1AKQ'
    },
    'text': 'Halit Yilmaz sieht für ein Foulspiel die Rote Karte.',
    'time': 70,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4B62C4K000001VS5489B5VUU0HQ6C/02K4JERC80000000VS5489B2VVTR1AKQ/02IFGQ2MI4000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Rote Karte für Adam Jabiri (27)',
    'team': 'home',
    'player': {
      'id': '00QBRRTKQK000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Adam Jabiri',
      'number': 27
    },
    'entries': {
      'games': 20,
      'goals': 17,
      'yellowCards': 7,
      'secondYellowCards': 0,
      'redCards': 1
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K6RHJQ6O000000VS5489B1VTKT0UD4',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K6RHJQ6O000000VS5489B1VTKT0UD4'
    },
    'text': 'Nach einem Foulspiel im Mittelfeld an Alexis Fambo, bekommt Adam Jabiri die Rote Kate gezeigt.\n\nNeuer Kapitän ist jetzt Lukas Billick.',
    'time': 63,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K2JGQPJO000001VS5489B8VVSIN1VH/02K6RHJQ6O000000VS5489B1VTKT0UD4/02IFGQ2L94000000VS5489B4VUIHV7I0'
  },
  {
    'headline': 'Rote Karte für Burak Ayvaz (7)',
    'team': 'home',
    'player': {
      'id': '00QBTEGMH4000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Burak Ayvaz',
      'number': 7
    },
    'entries': null,
    'type': 'redCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K237F1BC000000VS5489B5VT8CT2E0',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K237F1BC000000VS5489B5VT8CT2E0'
    },
    'text': null,
    'time': 68,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K22H9EJ4000001VS5489B5VT8CT2E0/02K237F1BC000000VS5489B5VT8CT2E0/02IFIGPVSC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Nico Ott (6)',
    'team': 'away',
    'player': {
      'id': '00QBT79Q5S000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Nico Ott',
      'number': 6
    },
    'entries': null,
    'type': 'redCard',
    'resultLikes': {
      'likes': 1,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K02V7P24000000VS5489B1VSP4RU6C',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K02V7P24000000VS5489B1VSP4RU6C'
    },
    'text': 'Klare Torchance vereitelt als letzter Mann, rot absolut korrekt.',
    'time': 40,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K02FBIU0000000VS5489B1VSP4RU6C/02K02V7P24000000VS5489B1VSP4RU6C/02IFIGQ0ES000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Daniel Winkler (20)',
    'team': 'home',
    'player': {
      'id': '012836DHN8000000VV0AG811VVMSCOJA',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Daniel Winkler',
      'number': 20
    },
    'entries': {
      'games': 13,
      'goals': 0,
      'yellowCards': 3,
      'secondYellowCards': 0,
      'redCards': 1
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4KC1TNS000000VS5489B5VUMN5B7G',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4KC1TNS000000VS5489B5VUMN5B7G'
    },
    'text': null,
    'time': 73,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4JNKKS8000001VS5489B5VUMN5B7G/02K4KC1TNS000000VS5489B5VUMN5B7G/02IF5VBKVC000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Arijanit Kelmendi (5)',
    'team': 'away',
    'player': {
      'id': '00QBSP3VFC000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Arijanit Kelmendi',
      'number': 5
    },
    'entries': null,
    'type': 'redCard',
    'resultLikes': {
      'likes': 4,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTQMKLCS000000VS5489B5VS0OTKFF',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTQMKLCS000000VS5489B5VS0OTKFF'
    },
    'text': null,
    'time': 19,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTPCHT18000001VS5489B6VTQROS91/02JTQMKLCS000000VS5489B5VS0OTKFF/02IF5VBO3O000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Malik Salkic (33)',
    'team': 'home',
    'player': {
      'id': '017J2CN51O000000VV0AG811VVJ2MRI4',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Malik Salkic',
      'number': 33
    },
    'entries': {
      'games': 19,
      'goals': 1,
      'yellowCards': 4,
      'secondYellowCards': 0,
      'redCards': 2
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K4JJITR8000000VS5489B5VUMN5B7G',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K4JJITR8000000VS5489B5VUMN5B7G'
    },
    'text': null,
    'time': 90,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K4IRLBNS000001VS5489B6VTHHCDJ7/02K4JJITR8000000VS5489B5VUMN5B7G/02IF5VBLB0000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Turgay Karvar (2)',
    'team': 'away',
    'player': {
      'id': '00QBTB0OIO000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Turgay Karvar',
      'number': 2
    },
    'entries': {
      'games': 15,
      'goals': 1,
      'yellowCards': 3,
      'secondYellowCards': 0,
      'redCards': 2
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02JTROJAKC000000VS5489B6VTQROS91',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02JTROJAKC000000VS5489B6VTQROS91'
    },
    'text': null,
    'time': 92,
    'reportLink': 'https://www.bfv.de/ticker/melden/02JTQRBOD0000001VS5489B5VS0OTKFF/02JTROJAKC000000VS5489B6VTQROS91/02IF5VBNJS000000VS5489B3VS27R2HJ'
  },
  {
    'headline': 'Rote Karte für Christoph Neuwirth (5)',
    'team': 'home',
    'player': {
      'id': '00QBT81MQG000000VV0AG819VSKRC3V1',
      'imageId': '029U6RQNHO000000VS5489B5VVJH11S3',
      'name': 'Christoph Neuwirth',
      'number': 5
    },
    'entries': {
      'games': 19,
      'goals': 3,
      'yellowCards': 1,
      'secondYellowCards': 0,
      'redCards': 1
    },
    'type': 'redCard',
    'resultLikes': {
      'likes': 0,
      'liked': false,
      'likeApiRoute': 'https://www.bfv.de/restapi/ticker/like/02K04J9KEO000000VS5489B5VT8CT2E0',
      'unlikeApiRoute': 'https://www.bfv.de/restapi/ticker/unlike/02K04J9KEO000000VS5489B5VT8CT2E0'
    },
    'text': null,
    'time': 75,
    'reportLink': 'https://www.bfv.de/ticker/melden/02K03TT5LG000001VS5489B6VV4DR9A5/02K04J9KEO000000VS5489B5VT8CT2E0/02IHAAGDIK000000VS5489B3VS27R2HJ'
  }
];

export const exampleGameInfo: GameInfo = {
  id: 'game_id',
  competition: {
    name: 'competition_name',
    link: 'competition_link',
    gameDay: 12
  },
  result: {
    home: 1,
    away: 2
  },
  date: new Date().toISOString(),
  homeTeam: {
    id: 'home_team_id',
    name: 'home_team_name',
    imageId: 'home_team_image_id'
  },
  awayTeam: {
    id: 'away_team_id',
    name: 'away_team_name',
    imageId: 'away_team_image_id'
  },
  adress: 'adress',
  adressDescription: 'adress_description',
  livetickers: [
    {
      id: 'liveticker_1_id',
      loadNew: true,
      ifModifiedSinceTimestamp: new Date().toISOString(),
      results: exampleLivetickerResults
    }
  ]
};
