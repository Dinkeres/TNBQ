var ProductionConfig = (function () {
    function ProductionConfig(config) {
        this.config = config;
        this.production = null;
    }
    ProductionConfig.prototype.inProduction = function () {
        if (this.production !== null) {
            return this.production.isActive();
        }
        return false;
    };
    ProductionConfig.prototype.getProductionSettings = function () {
        if (this.inProduction()) {
            return this.production;
        }
    };
    return ProductionConfig;
}());
export default ProductionConfig;
