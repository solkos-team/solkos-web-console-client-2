import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { defaultProps, mapOptions } from "./datos";
import { useSelector } from "react-redux";
import { pathVerify } from "../../Functions/pathVerify";
import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
import { fetchUniversal } from "../../utils/apiUtils";
export const MapResponsive = ({ data, setData, isLoading, setIsLoading }) => {
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body, setIsLoading);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };
  const data2 = [
    {
      area: "Monarca",
      num_coolers: 38146,
      geo: [
        [17.38099060058594, -101.05696716308594],
        [16.850900610284828, -99.90836933443033],
        [16.803410212198894, -99.83320490519206],
        [16.77228307723999, -99.77464866638184],
        [16.963475036621094, -99.09930572509765],
        [16.6081641515096, -98.32165781656902],
        [17.333105263540855, -98.0105878667448],
        [17.33322752217285, -98.0105716088151],
        [17.826310634613037, -97.81172943115234],
        [18.37799898783366, -97.26009623209636],
        [18.434021313985188, -96.06354522705078],
        [19.155640029907225, -96.11067504882813],
        [19.572058995564777, -96.92334493001302],
        [20.955429395039875, -97.43667856852214],
        [20.950443278740778, -97.62373558213976],
        [19.976427465549044, -99.17337278401692],
        [20.568739700317384, -99.69230499267579],
        [20.6672306060791, -99.89293975830078],
        [20.70554765065511, -100.02091471354167],
        [20.679188537597657, -100.45318145751953],
        [21.01606782277425, -101.25202814737956],
        [21.168362299601238, -101.63178253173828],
        [21.327059110005695, -101.92240778605144],
        [20.44307057, -102.394512],
        [20.29237461090088, -102.6049207051595],
        [20.17294337, -103.0392462],
        [20.17291148, -103.0399683],
        [20.16236641, -103.116973],
        [20.16091267, -103.1187801],
        [19.96313540140788, -103.08925882975261],
        [19.18832524617513, -102.86454645792644],
        [19.142249263758952, -102.85728359766927],
        [18.120824495951336, -102.85852177937825],
        [18.088297208150227, -102.79173914591472],
        [18.077827, -102.755645],
        [17.982593197168782, -102.35689732554688],
        [17.93131449, -102.2237653],
        [17.820425351460777, -101.88821792602539],
        [17.674335, -101.6423367],
        [17.66767833, -101.6323667],
        [17.535667897350216, -101.44199348785877],
        [17.38099060058594, -101.05696716308594],
        [16.745538393656414, -92.63276545206706],
        [14.887645880381266, -92.26803461710612],
        [16.78217863433838, -92.5521641982693],
        [17.548146565755207, -92.95303090413411],
        [16.745538393656414, -92.63276545206706],
      ],
    },
    {
      area: "Bajío",
      num_coolers: 33938,
      geo: [
        [21.411961552530926, -97.71748495666503],
        [22.215882937113445, -98.40074284871419],
        [22.286808649698894, -98.64717483520508],
        [22.01021448771159, -99.03004582722981],
        [21.50381117, -100.4399514],
        [21.52040833, -100.5123217],
        [21.70355178, -101.0421945],
        [21.699975, -101.279875],
        [21.7643723, -101.5587975],
        [21.76861889, -101.654142],
        [21.51700210571289, -101.94537607828777],
        [21.36153667, -102.1274817],
        [20.60917717949951, -103.24185224154947],
        [19.837765216827393, -102.60065841674805],
        [19.37761338551839, -102.08032735188802],
        [19.631390889485676, -101.29346466064453],
        [18.898439367828775, -100.14445538479492],
        [17.095986366271973, -100.47160466512044],
        [16.865484873453777, -99.92030080159505],
        [17.03304958343506, -99.19795036315918],
        [18.052768071492512, -99.59474309285481],
        [18.969736735026043, -98.24110921223958],
        [18.52431583404541, -97.5452995300293],
        [18.46489429473877, -97.38951237996419],
        [17.139466094970704, -96.77734375],
        [16.450128879428437, -98.04420254950628],
        [15.835120677947998, -97.0423583984375],
        [15.835585021972657, -96.31995391845703],
        [16.592439651489258, -95.15866546630859],
        [17.939860153198243, -94.92415924072266],
        [18.130148315429686, -94.53001556396484],
        [18.24422311782837, -94.7606201171875],
        [18.97998144517578, -96.07624186288085],
        [19.086158116658527, -96.10128784179688],
        [19.15561580657959, -96.12158584594727],
        [19.205584716796874, -96.16258850097657],
        [19.390947818756104, -96.63636779785156],
        [20.338302612304688, -97.42375335693359],
        [20.551339149475098, -97.41876220703125],
        [20.972777533603246, -97.40309267184789],
        [21.411961552530926, -97.71748495666503],
        [17.504930814107258, -91.97705332438152],
        [17.878223037719728, -93.0699951171875],
        [18.130148315429686, -94.53001556396484],
        [16.78731729827881, -93.11079194051108],
        [16.74756622314453, -92.52044296264648],
        [16.97973378499349, -92.28819020589192],
        [17.256745529174804, -92.11445617675781],
        [17.504930814107258, -91.97705332438152],
      ],
    },
  ];

  const handleApiLoaded2 = (map, maps) => {
    data2 === undefined
      ? []
      : data2.forEach((area) => {
          const polygonCoords = area.geo.map((coord) => ({
            lat: coord[0],
            lng: coord[1],
          }));
          const polygon = new maps.Polygon({
            paths: polygonCoords,
            strokeColor: area.area === "Monarca" ? "#FF0000" : "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: area.area === "Monarca" ? "#FF0000" : "#0000FF",
            fillOpacity: 0.35,
          });
          polygon.setMap(map);
        });
  };
  const handleApiLoaded = (map, maps) => {
    const bounds = new maps.LatLngBounds();
    var mIcon = {
      path: maps.SymbolPath.CIRCLE,
      fillOpacity: 0.8,
      fillColor: "#ED5079",
      strokeOpacity: 0.0,
      strokeWeight: 1,
      scale: 20,
    };
    dataMapa === undefined
      ? []
      : dataMapa.forEach(
          ({ latitude, longitude, num_coolers, area }, index) => {
            const marker = new maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
              title: `${area}  ${num_coolers.toLocaleString(
                "es-MX"
              )} Enfriadores`,
              icon: mIcon,
              label: {
                color: "#000",
                fontSize: "12px",
                fontWeight: "600",
                text: `${num_coolers.toLocaleString("es-MX")}`,
              },
            });
            bounds.extend(marker.getPosition());
          }
        );
    map.fitBounds(bounds);
    const MIN_ZOOM = 6;
    const maxZoomService = new maps.MaxZoomService();
    maxZoomService.getMaxZoomAtLatLng(bounds.getCenter(), (response) => {
      if (response.status === "OK") {
        const maxZoom = response.zoom;
        map.setZoom(Math.min(maxZoom, MIN_ZOOM));
      }
    });
  };
  const dataMapa =
    data?.geo_data == null
      ? []
      : data?.geo_data
          .filter(
            (cooler) =>
              parseFloat(cooler.latitude) != 0 &&
              parseFloat(cooler.longitude) != 0
          )
          .map((cooler) => ({
            latitude: parseFloat(cooler.latitude),
            longitude: parseFloat(cooler.longitude),
            num_coolers: cooler.num_coolers,
            area: cooler.area,
          }));
  useEffect(() => {
    fetchData();
  }, [dt, dto]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isLoading === true ? (
        <SkeletonMapInsights />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
          defaultCenter={defaultProps.center}
          defaultZoom={6}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
          }}
          // options={mapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMapReact>
      )}
    </div>
  );
};
