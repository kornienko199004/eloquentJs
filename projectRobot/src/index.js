import VillageState from './modules/village';
import {
  runRobot,
  randomRobot,
  buildGraph,
  routeRobot,
  goalOrientedRobot,
} from './modules/logic';
import { data } from './modules/data';

const roadGraph = buildGraph(data);
const village = VillageState.random(roadGraph);

runRobot(village, randomRobot);
runRobot(village, routeRobot, []);
runRobot(village, goalOrientedRobot, []);
