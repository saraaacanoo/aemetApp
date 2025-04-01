require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
    'esri/rest/support/Query',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/widgets/Search'
], (Map, MapView, FeatureLayer, GraphicsLayer, Graphic, Query, SimpleMarkerSymbol, Search) => {

    const map = new Map({
        basemap: 'dark-gray'
    });

    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-6.6, 38.8],
        zoom: 7
    });

    const featureLayer = new FeatureLayer({
        portalItem: {
            id: 'a1ed591833e9476f8817fa12e578b837'
        },
        renderer: {
            type: 'simple',
            symbol: {
                type: 'simple-marker',
                color: 'blue'
            }
        }
    });

    const capaGrafica = new GraphicsLayer();
    map.add(capaGrafica);

    const parametrosQuery = new Query({
        where: "provincia = 'Cáceres' OR provincia = 'Badajoz'",
        returnGeometry: true,
        outFields: ['*']
    });

    featureLayer.queryFeatures(parametrosQuery).then((resultadoQuery) => {
        const entidades = resultadoQuery.features;

        entidades.forEach((entidad) => {
            const simbolo = new SimpleMarkerSymbol({
                color: [18, 226, 157, 1],
                outline: {
                    color: [53, 121, 109, 1],
                    width: 1
                },
                size: 12,
                style: 'circle'
            });

            const grafico = new Graphic({
                geometry: entidad.geometry,
                symbol: simbolo,
                attributes: entidad.attributes,
                popupTemplate: {
                    title: "{nombre}",
                    content: [{
                        type: "fields",
                        fieldInfos: [
                            { fieldName: "provincia", label: "Provincia" },
                            { fieldName: "elaborado", label: "Fecha Elaboración" },
                            { fieldName: "probabilidad_de_precipitación_f", label: "Probabilidad de Lluvia (Día Completo)" },
                            { fieldName: "probabilidad_de_precipitación_1", label: "Probabilidad de Lluvia (Día 1)" },
                            { fieldName: "probabilidad_de_precipitación_7", label: "Probabilidad de Lluvia (Día 2)" },
                            { fieldName: "probabilidad_de_precipitación_14", label: "Probabilidad de Lluvia (Día 3)" },
                            { fieldName: "probabilidad_de_precipitación_17", label: "Probabilidad de Lluvia (Día 4)" },
                            { fieldName: "probabilidad_de_precipitación_20", label: "Probabilidad de Lluvia (Día 5)" },
                            { fieldName: "probabilidad_de_precipitación_21", label: "Probabilidad de Lluvia (Día 6)" },
                            { fieldName: "probabilidad_de_precipitación_22", label: "Probabilidad de Lluvia (Día 7)" },
                            { fieldName: "descripción_del_estado_del_ci_1", label: "Estado del cielo (Día 1)" },
                            { fieldName: "descripción_del_estado_del_ci_7", label: "Estado del cielo (Día 2)" },
                            { fieldName: "descripción_del_estado_del_ci_14", label: "Estado del cielo (Día 3)" },
                            { fieldName: "descripción_del_estado_del_ci_17", label: "Estado del cielo (Día 4)" },
                            { fieldName: "descripción_del_estado_del_ci_20", label: "Estado del cielo (Día 5)" },
                            { fieldName: "descripción_del_estado_del_ci_21", label: "Estado del cielo (Día 6)" },
                            { fieldName: "descripción_del_estado_del_ci_22", label: "Estado del cielo (Día 7)" },
                            { fieldName: "temperatura_máxima_fecha1_0024", label: "Temperatura máxima (Día 1)" },
                            { fieldName: "temperatura_máxima_fecha2_0024", label: "Temperatura máxima (Día 2)" },
                            { fieldName: "temperatura_máxima_fecha3_0024", label: "Temperatura máxima (Día 3)" },
                            { fieldName: "temperatura_máxima_fecha4_0024", label: "Temperatura máxima (Día 4)" },
                            { fieldName: "temperatura_máxima_fecha5_0024", label: "Temperatura máxima (Día 5)" },
                            { fieldName: "temperatura_máxima_fecha6_0024", label: "Temperatura máxima (Día 6)" },
                            { fieldName: "temperatura_máxima_fecha7_0024", label: "Temperatura máxima (Día 7)" },
                            { fieldName: "temperatura_mínima_fecha1_0024", label: "Temperatura mínima (Día 1)" },
                            { fieldName: "temperatura_mínima_fecha2_0024", label: "Temperatura mínima (Día 2)" },
                            { fieldName: "temperatura_mínima_fecha3_0024", label: "Temperatura mínima (Día 3)" },
                            { fieldName: "temperatura_mínima_fecha4_0024", label: "Temperatura mínima (Día 4)" },
                            { fieldName: "temperatura_mínima_fecha5_0024", label: "Temperatura mínima (Día 5)" },
                            { fieldName: "temperatura_mínima_fecha6_0024", label: "Temperatura mínima (Día 6)" },
                            { fieldName: "temperatura_mínima_fecha7_0024", label: "Temperatura mínima (Día 7)" },


                        ]
                    }]
                }
            });

            capaGrafica.add(grafico);
        });
    });
    const searchWidget = new Search({
        view: view,
        includeDefaultSources: false,
        sources: [
            {
                layer: featureLayer,
                searchFields: ["nombre", "provincia"],
                displayField: "nombre",
                exactMatch: false,
                outFields: ["nombre", "provincia"],
                name: "AEMET Datos",
                placeholder: "Buscar Estaciones..."
            }
        ]
    });

    view.ui.add(searchWidget, {position: "top-left"});
});

