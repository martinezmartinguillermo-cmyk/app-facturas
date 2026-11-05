# Cambios: revisión para Chrome en Android y en PC

Todo sigue en un único `facturas.html`, sin pasos de compilación. **No cambia la forma de guardar los datos**: misma colección `data/users/<id>`, mismos documentos `cfg`, `cl`, `inv`, `ex` y `rt` con la forma `{v: ...}`, y la misma copia en `localStorage` (`fx2`).

## Errores corregidos
- **Fecha de hoy en hora española.** Antes se calculaba en UTC: entre las 00:00 y la 01:00 (o las 02:00 en verano), las facturas, los cobros y los vencimientos salían con el día anterior. Además, si la app se queda abierta, la fecha se actualiza al volver a ella al día siguiente.
- **Datos antiguos o incompletos.** Una factura sin número, sin líneas o con importes guardados como texto bloqueaba la app entera (`i.num.startsWith is not a function`). Ahora, al cargar, se completan los campos que faltan con valores por defecto, sin tocar la estructura de los datos.
- **Elementos borrados.** Si la factura, el gasto o el cliente abierto ya no existe (por ejemplo, porque se borró en otro dispositivo), la app vuelve a la lista en vez de fallar.
- **Importes con separador de miles.** «1.200,50» se leía como 1,20 €. Ahora se entienden 1.200,50 / 1,200.50 / 1.200 / 12,5 / «45 €» / «15 %».
- **Guardado en la cuenta en orden.** Si se guardaba dos veces seguidas, una escritura antigua podía llegar después de la nueva y pisarla. Ahora los guardados van en cola y se envía una copia de los datos.
- **Números de factura escapados** en la lista y en el registro: un número con `<` o `&` rompía la pantalla.
- Resultados decía que el criterio se cambia «en Inicio»; está en **Más › Mis datos**.
- Sin retención ya no aparece «IRPF −0,00 €».

## Casos límite
- **Aviso de orden de fechas:** si una factura nueva tiene fecha anterior a otra de la misma serie, se avisa y hay que pulsar «Emitir» otra vez para confirmarlo.
- La lista de facturas se ordena por fecha y número, no por el orden en que se dieron de alta o se sincronizaron.

## Uso en el móvil
- **El botón «atrás» de Android** vuelve a la pantalla anterior en lugar de salir de la app. Los formularios no entran en el historial, así que «atrás» nunca reabre una factura ya emitida.
- Teclado adecuado a cada campo: autocompletado de Chrome en Mis datos; en Clientes está desactivado para que Chrome no rellene ahí tus propios datos. NIF e IBAN se escriben en mayúsculas y sin corrector, y el código postal admite 5 cifras.
- Campos alineados aunque una etiqueta ocupe dos líneas en pantallas estrechas.
- Margen inferior que respeta la zona segura del móvil; los botones del detalle de factura pasan a otra fila si no caben.
- Los avisos se cierran al tocarlos.

## Accesibilidad
- Zonas táctiles de al menos 44 px (botones, selector de año), casillas de 22 px y barra inferior de 58 px.
- Contraste: el texto de los botones activos (píldoras, Mensual/Anual) ya se lee en modo oscuro, y las leyendas del gráfico (Ventas, Cobrado, Gastos) y el texto secundario cumplen el nivel AA.
- Etiquetas accesibles en los campos que solo tenían texto de ejemplo y en los selectores de año, trimestre y mes.
- Tarjetas y filas pulsables usables con teclado (Tab, y luego Intro o Espacio), con foco visible.
- Barra de navegación con `aria-current`; los emojis decorativos quedan ocultos para el lector de pantalla y los avisos se le anuncian (`role=status`).

## Rendimiento
- Los euros se formatean con un único `Intl.NumberFormat` reutilizado. Con 3000 facturas, el registro pasa de unos 215 ms a unos 30 ms por pintado (medido en PC; en un móvil la diferencia es mayor).
- La lista de facturas muestra 50 y un botón «Mostrar más»: con 3000 facturas pasa de unos 90 ms a unos 6 ms.
- La fuente Inter se carga sin bloquear el primer pintado.
- Mensaje claro cuando la app se abre fuera de claude.ai.

## Pruebas realizadas
Playwright (Chromium) a **360, 390, 768 y 1280 px**, con datos de ejemplo y `window.claude` simulado (`db`, `user`, `downloads`, `sample`). Pantallas revisadas: Inicio (pestañas Facturas y Gastos), Facturas (con y sin filtro de cliente), nueva factura, detalle, Gastos (alta y edición), Clientes (alta y edición), Más, Mis datos, Personalizar facturas, Registro, Resultados, Kilometraje y Series. En ninguna hay **errores en consola ni desplazamiento lateral**. También se probó:
- modo oscuro;
- datos incompletos o corruptos en `localStorage`;
- emisión de facturas y aviso de fecha fuera de orden;
- navegación con «atrás»;
- 3000 facturas;
- generación de PDF a 360 px (sale en A4 correcto).

Probé fijar el ancho de la ventana para el PDF, pero el resultado salía recortado, así que lo descarté.

## No incluido (pendiente de tu decisión)
- Al sincronizar, una factura o un cliente borrado en un dispositivo puede reaparecer si otro dispositivo todavía tiene su copia local. Arreglarlo exige guardar las fichas borradas, y eso cambia la estructura de datos.
- Al empezar un año nuevo, el prefijo de la serie (`A-2026-`) no cambia solo: sigue haciéndose a mano en Más › Series.
