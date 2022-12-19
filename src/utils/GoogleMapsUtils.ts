import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import { constant } from "../config/constant";

const apiOptions = {
    "apiKey": constant.API_KEY,
};

const mapOptions = {
    "tilt": 0,
    "heading": 0,
    "zoom": 12,
    "center": { lat: 22.302711, lng: 114 },
    "mapId": constant.MAP_ID
}

async function initMap() {
    const mapDiv = document.getElementById("map") as HTMLElement;
    const apiLoader = new Loader(apiOptions);
    await apiLoader.load();
    return new google.maps.Map(mapDiv, mapOptions);
}

async function initWebGLOverlayView(map: google.maps.Map | null) {
    let scene: any, renderer: any, camera: any;
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.set(0.5, -1, 0.5);
        scene.add(directionalLight);
    }

    webGLOverlayView.onContextRestored = ({ gl }) => {
        renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes(),
        });

        renderer.autoClear = false;
    }

    webGLOverlayView.onDraw = ({ gl, transformer }) => {
        webGLOverlayView.requestRedraw();
        renderer.render(scene, camera);
        renderer.resetState();
    }

    webGLOverlayView.setMap(map);
}

function addMarkerToMap(map: any, position: any, contentString: string) {
    const marker = new google.maps.Marker({
        position: position,
        map: map
    });

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Uluru",
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}

async function createMap() {
    const map = await initMap();
    initWebGLOverlayView(map);
    return map;
}

export {
    createMap, addMarkerToMap
};
