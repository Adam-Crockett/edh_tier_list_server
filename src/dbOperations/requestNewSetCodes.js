import Set from '../models/set.js';
export default async function requestNewSetCodes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Set.find({}, (error, results) => {
        if (error) {
          console.error('Error retrieving updated set codes', error);
        } else {
          const codes = results.map((result) => [
            result.code,
            result.released_at,
          ]);
          console.log(codes.length);
          resolve(codes);
        }
      });
    }, 5000);
  });
}
