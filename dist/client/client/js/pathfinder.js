import * as _ from "lodash";
import AStar from "./lib/astar";
import Player from "./player";
var Pathfinder = (function () {
    function Pathfinder(width, height) {
        this.width = width;
        this.height = height;
        this.grid = null;
        this.blankGrid = [];
        this.initBlankGrid_();
        this.ignored = [];
    }
    Pathfinder.prototype.initBlankGrid_ = function () {
        for (var i = 0; i < this.height; i += 1) {
            this.blankGrid[i] = [];
            for (var j = 0; j < this.width; j += 1) {
                this.blankGrid[i][j] = 0;
            }
        }
    };
    Pathfinder.prototype.findPath = function (grid, entity, x, y, findIncomplete) {
        var start = [entity.gridX, entity.gridY];
        var end = [x, y];
        var path;
        this.grid = grid;
        this.applyIgnoreList_(true);
        if (!(entity instanceof Player) && entity.gridX === x && entity.gridY === y) {
            if (!grid[y][entity.gridX + 1]) {
                start = [entity.gridX + 1, entity.gridY];
            }
        }
        path = AStar(this.grid, start, end);
        if (path.length === 0 && findIncomplete === true) {
            path = this.findIncompletePath_(start, end);
        }
        return path;
    };
    Pathfinder.prototype.findIncompletePath_ = function (start, end) {
        var perfect, x, y, incomplete = [];
        perfect = AStar(this.blankGrid, start, end);
        for (var i = perfect.length - 1; i > 0; i -= 1) {
            x = perfect[i][0];
            y = perfect[i][1];
            if (this.grid[y][x] === 0) {
                incomplete = AStar(this.grid, start, [x, y]);
                break;
            }
        }
        return incomplete;
    };
    Pathfinder.prototype.ignoreEntity = function (entity) {
        if (entity) {
            this.ignored.push(entity);
        }
    };
    Pathfinder.prototype.applyIgnoreList_ = function (ignored) {
        var self = this, x, y;
        _.each(this.ignored, function (entity) {
            x = entity.isMoving() ? entity.nextGridX : entity.gridX;
            y = entity.isMoving() ? entity.nextGridY : entity.gridY;
            if (x >= 0 && y >= 0) {
                self.grid[y][x] = ignored ? 0 : 1;
            }
        });
    };
    Pathfinder.prototype.clearIgnoreList = function () {
        this.applyIgnoreList_(false);
        this.ignored = [];
    };
    return Pathfinder;
}());
export default Pathfinder;
