# App de facturación personal (España)

## Qué es
App web de facturación para un autónomo en España (técnico de sonido en directo). Todo está en **un solo archivo: `facturas.html`** (HTML, CSS y JavaScript juntos). Interfaz en español de España.

Funciones: inicio con gráficos, facturas (series editables, número editable, IVA, IRPF, suplidos, fecha del servicio, rectificativas, cobros, editar y borrar), clientes (con alias), gastos, registro de facturas con CSV, resultados, plantilla personalizable, PDF, calculadora de kilometraje, mis datos.

## Restricciones (no romper)
- Debe seguir siendo **un único archivo HTML autocontenido**. Se publica como página en claude.ai.
- Scripts externos solo desde `https://cdnjs.cloudflare.com` o `https://cdn.jsdelivr.net/npm/`, con versión fija. Fuentes solo de Google Fonts. Nada más puede cargarse desde fuera.
- Usa las capacidades `window.claude` del entorno: `db`, `user`, `downloads` y `sample`. No cambies las rutas de datos: colección `data/users/<id>` con los documentos `cfg`, `cl`, `inv`, `ex` y `rt`, cada uno con la forma `{v: ...}`. `localStorage` (clave `fx2`) es solo copia de respaldo.
- Los datos que vienen de `db` son de solo lectura: se clonan antes de modificarlos (ya está hecho, no lo quites).
- **No pierdas ni rompas datos existentes**: cualquier cambio en la estructura de datos debe ser compatible con lo ya guardado.
- Importes siempre en **céntimos enteros**. Total = base + IVA + recargo − IRPF + suplidos. Los suplidos no entran en la base.
- La numeración de facturas va por series correlativas y no se puede repetir un número.

## Tarea pendiente
Revisa y optimiza la app para que funcione perfectamente en **Android con Google Chrome y en Chrome de PC**:
1. Busca y corrige errores, casos límite y datos que falten, sin cambiar cómo se guardan los datos.
2. Prueba con Playwright (Chromium) a 360, 390, 768 y 1280 px de ancho, con datos de ejemplo: ninguna pantalla debe dar errores en consola ni desplazarse de lado. Revisa todas las pantallas (Inicio, Facturas, nueva factura, detalle, Gastos, Clientes, Más y sus apartados).
3. Mejora rendimiento, accesibilidad (tamaños táctiles, contraste, etiquetas) y la usabilidad en móvil.
4. Haz un commit por cada mejora y explica los cambios en `CAMBIOS.md`.
5. Al terminar, abre un pull request con el resumen.

El usuario publicará luego el `facturas.html` actualizado en claude.ai, así que el archivo tiene que funcionar tal cual, sin pasos de compilación.
