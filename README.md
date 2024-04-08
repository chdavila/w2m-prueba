# Prueba world2meet

Hola, la prueba esta hecha con angular la ultima version de angular disponible 17.3, Para el manejo de las peticiones al backend se uso la libreria **stubby** en la cual nos permite crear mocks de las peticiones http que se manejan en la prueba, debido a esto la forma del proyecto cambia un por lo cual se añadio el script start el cual inicia el stubby y el proyecto de Angular en el puerto 4200.

Correr el comando `npm start` el cual levanta el proyecto entero con el servidor de stubby.

## Librerias usadas

### Angular Material
Debido a que el proyecto puede escalar decidí usar la libreria de angular material donde realice la respectiva modificación de los temas para incluir la paleta de colores de la empresa world2meet ademas de la configuración de los modulos usados en el proyecto y también la optimización de los que se usarian para no darle un peso innecesario a la aplicación.

### Stubby
Como lo explique anteriormente esta librería se uso para simular las llamadas http del proyecto ya que nos da la flexibildad de poder editar la response que esperamos, tambien con la librería se puede modificar el status de la respuesta y cambiarlo para que devuelva un error y con eso poder probar todo desde nuestro local antes de subir a un ambiente productivo, dejo la ruta de donde se puede cambiar los status responses de la librería para que puedan probar los errores.
`/mocks/config.yml` 
```
-request:
		method: GET
		url: ^/heroes/marvel$
		response:
		- status: 200 <--- poner status 500 para probar errores
		  latency: 1000
		  file: api/GET_200_marvel_heroes.json
```

## Store

Para el Store tome la decisión de hacerlo por mi mismo y dejar un punto intermedio entre los behaviorsubjects y rxjs con Redux por lo cual hice un ministore con ayuda de un behavior pero donde la data fluye para una sola dirección y tenemos updaters y selectors como en ngrx cuestión de que si el proyecto crece demasiado y se opta por usar ngrx sea mas suave la transición al ya tener un store selectors y updaters.

## Mejoras
Se debe tener en cuenta que el proyecto fue creado como una SPA que se sirve al lado del cliente pero si se quiere mejoras de SEO se recomienda usar SSR que ya esta disponible en la versión 17 de Angular y dejar desplegado al lado del servidor.