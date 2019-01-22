import { randomPick } from './logic';

export default class VillageState {
  constructor(place, parcels, roadGraph) {
    this.place = place;
    this.parcels = parcels;
    this.roadGraph = roadGraph;
  }

  move(destination) {
    if (!this.roadGraph[this.place].includes(destination)) {
      return this;
    }
    const parcels = this.parcels.map((p) => {
      if (p.place !== this.place) {
        return p;
      }
      return { place: destination, address: p.address };
    }).filter(p => p.place !== p.address);

    return new VillageState(destination, parcels, this.roadGraph);
  }

  static random(roadGraph, parcelsCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelsCount; i += 1) {
      const address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({ place, address });
    }
    return new this('Post Office', parcels, roadGraph);
  }
}
