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
  databaseType: new DatabaseType('debug'),
  verbose: true,
  cryptionKeys: {
    encryptionKey: new FixedLength(Uint8Array.from([0xba, 0x63, 0x5f, 0x92, 0x8f, 0x0f, 0x16, 0x5c, 0x83, 0x82, 0xde, 0x6f, 0x9a, 0x98, 0x09, 0xa9, 0xec, 0x0d, 0x60, 0x8b, 0x6d, 0x2a, 0x7a, 0x91, 0xeb, 0xa0, 0xd8, 0x83, 0x8d, 0x0b, 0x34, 0x08]), 32),
    initialisationVector: new FixedLength(Uint8Array.from([0x42, 0x76, 0x90, 0xb6, 0x6f, 0x6f, 0x10, 0x30, 0x67, 0x24, 0x93, 0x16, 0x51, 0x93, 0x5c, 0x39]), 16),
    vernamKey: new FixedLength(Uint8Array.from([0x29, 0x5a, 0x57, 0xe3, 0x54, 0x2d, 0x1c, 0xd4, 0xd5, 0xbc, 0x65, 0xc4, 0xb8, 0x3d, 0xe4, 0x0e, 0x41, 0x70, 0x16, 0x18, 0x76, 0x0c, 0x45, 0x51, 0xa6, 0x27, 0xb5, 0x08, 0xd3, 0xb5, 0x47, 0x8d]), 32)
  },
  fiatShamirKeys: {
    N: 150516441412823840666345955719414936646580349056110274175941543508800514675873778488282425206975940466746514254314643946834311806513430328579032561255361884484766631620889189553097064462363315005901232143628884848770943848447118616993122943795840115887905973975065127929809257348312813843028066914736491630387n,
    e: 143275061127265551919210920573111088511226764965079014056058978138349501923183999835406118896378947313388079180328131406370625871454809307995092349380571192896680233838214170440165641560329259789440539033153521392231826292723820853465159362206098432843895822872230198900104396080104821449016631693911651838465n
  },
  production: false,
  name: 'dev'
}
