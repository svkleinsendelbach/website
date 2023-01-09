import { DatabaseType } from "src/app/template/classes/database-type";
import { FixedLength } from "src/app/template/crypter/FixedLength";

export const environment = {
  firebase: {
    projectId: 'svkleinsendelbach-website',
    appId: '1:692585018735:web:ad5e8548b2906b1c8de49a',
    databaseURL: 'https://svkleinsendelbach-website-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'svkleinsendelbach-website.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCwCkmxzEmaO8Nlci9aVPeDYMoy3dp_ZlQ',
    authDomain: 'svkleinsendelbach-website.firebaseapp.com',
    messagingSenderId: '692585018735',
    measurementId: 'G-SR9ZWPFK09',
  },
  googleMaps: {
    apiKey: 'AIzaSyCF4V3NBWj3f5tFndoquwQHYRENqTiVRek'
  },
  databaseType: new DatabaseType('release'),
  verbose: false,
  cryptionKeys: {
    encryptionKey: new FixedLength(Uint8Array.from([0x62, 0xde, 0xee, 0xd2, 0xe8, 0x9b, 0xf7, 0x1c, 0x53, 0xd8, 0x7e, 0x21, 0xb1, 0xe9, 0xf2, 0xfc, 0x22, 0x94, 0x71, 0x81, 0x61, 0xfb, 0x61, 0x75, 0xb7, 0xde, 0x31, 0xe8, 0xb7, 0x96, 0x9e, 0x6e]), 32),
    initialisationVector: new FixedLength(Uint8Array.from([0x8d, 0xd8, 0x6d, 0xaf, 0x3b, 0x41, 0x82, 0x8b, 0x19, 0x12, 0xfb, 0x42, 0x49, 0xe1, 0x22, 0x0e]), 16),
    vernamKey: new FixedLength(Uint8Array.from([0x6c, 0xdb, 0x90, 0x7b, 0x9b, 0x01, 0x9f, 0x97, 0x55, 0x4b, 0xbb, 0x70, 0x83, 0x63, 0xd3, 0xdf, 0xae, 0x5f, 0xff, 0x11, 0x52, 0xac, 0x6c, 0xe5, 0xa5, 0xaf, 0x01, 0x62, 0xeb, 0xb7, 0x2b, 0x1f]), 32)
  },
  fiatShamirKeys: {
    N: 150516441412823840666345955719414936646580349056110274175941543508800514675873778488282425206975940466746514254314643946834311806513430328579032561255361884484766631620889189553097064462363315005901232143628884848770943848447118616993122943795840115887905973975065127929809257348312813843028066914736491630387n,
    e: 143275061127265551919210920573111088511226764965079014056058978138349501923183999835406118896378947313388079180328131406370625871454809307995092349380571192896680233838214170440165641560329259789440539033153521392231826292723820853465159362206098432843895822872230198900104396080104821449016631693911651838465n
  },
  production: true,
  name: 'prod'
}
