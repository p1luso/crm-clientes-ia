# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al CRM de Clientes con IA! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)

## 📜 Código de Conducta

Este proyecto sigue un código de conducta para asegurar un ambiente acogedor para todos. Al participar, se espera que mantengas un comportamiento respetuoso y constructivo.

## 🚀 Cómo Contribuir

### Reportar Bugs

1. **Verifica** que el bug no haya sido reportado anteriormente
2. **Crea un issue** con la etiqueta `bug`
3. **Incluye** información detallada:
   - Descripción del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del sistema

### Sugerir Mejoras

1. **Crea un issue** con la etiqueta `enhancement`
2. **Describe** claramente la mejora propuesta
3. **Explica** el beneficio y casos de uso
4. **Considera** la implementación y complejidad

### Contribuir Código

1. **Fork** el repositorio
2. **Crea una rama** para tu feature/fix
3. **Haz commit** de tus cambios
4. **Push** a tu fork
5. **Abre un Pull Request**

## ⚙️ Configuración del Entorno

### Prerrequisitos

- Node.js 18+
- pnpm
- Git
- Cuenta de Convex
- Cuenta de Upstash (opcional)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/crm-clientes-ia.git
cd crm-clientes-ia

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Configurar Convex
npx convex dev --configure

# Ejecutar en desarrollo
pnpm dev
```

## 🔧 Proceso de Desarrollo

### 1. Crear una Rama

```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nombre-de-la-feature
# o
git checkout -b fix/descripcion-del-fix
```

### 2. Hacer Cambios

- **Sigue** las convenciones de código establecidas
- **Escribe** tests para nuevas funcionalidades
- **Actualiza** documentación si es necesario
- **Mantén** el código limpio y bien comentado

### 3. Commit

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad de exportación"
# o
git commit -m "fix: corregir error en validación de formulario"
```

### 4. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-de-la-feature

# Crear Pull Request en GitHub
```

## 📏 Estándares de Código

### TypeScript

- **Usa** tipos explícitos cuando sea posible
- **Evita** `any` - usa tipos específicos
- **Documenta** interfaces y tipos complejos
- **Sigue** las reglas de ESLint configuradas

### React

- **Usa** componentes funcionales con hooks
- **Mantén** componentes pequeños y enfocados
- **Usa** TypeScript para props
- **Sigue** las convenciones de naming

### Estilo de Código

- **Usa** Prettier para formateo automático
- **Sigue** las reglas de ESLint
- **Mantén** líneas bajo 80 caracteres
- **Usa** nombres descriptivos para variables y funciones

### Estructura de Archivos

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI base
│   └── ...             # Componentes específicos
├── lib/                # Utilidades y configuraciones
├── types/              # Definiciones de TypeScript
├── utils/              # Funciones auxiliares
└── app/                # App Router de Next.js
```

## 🔄 Proceso de Pull Request

### Antes de Enviar

- [ ] **Código** compila sin errores
- [ ] **Tests** pasan correctamente
- [ ] **Linting** no muestra errores
- [ ] **Documentación** actualizada si es necesario
- [ ] **Commits** siguen convenciones

### Template de Pull Request

```markdown
## 📝 Descripción
Breve descripción de los cambios realizados.

## 🔗 Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## 🧪 Testing
- [ ] Tests unitarios agregados/actualizados
- [ ] Tests de integración ejecutados
- [ ] Testing manual realizado

## 📸 Screenshots (si aplica)
Agregar screenshots de los cambios visuales.

## ✅ Checklist
- [ ] Código sigue estándares del proyecto
- [ ] Self-review completado
- [ ] Documentación actualizada
- [ ] No breaking changes (o documentados)
```

### Review Process

1. **Automático**: CI/CD checks
2. **Manual**: Review de código por maintainers
3. **Testing**: Verificación de funcionalidad
4. **Merge**: Una vez aprobado

## 🏷️ Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan funcionalidad)
- `refactor`: Refactoring de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, dependencias, etc.

### Ejemplos

```bash
feat(auth): agregar autenticación con Google
fix(ui): corregir alineación de botones
docs(readme): actualizar instrucciones de instalación
refactor(api): simplificar lógica de validación
```

## 🐛 Reportar Problemas

### Antes de Reportar

1. **Busca** en issues existentes
2. **Verifica** que no sea un problema conocido
3. **Prueba** con la última versión

### Información Necesaria

- **Versión** del proyecto
- **Sistema operativo**
- **Navegador** (si aplica)
- **Pasos** para reproducir
- **Comportamiento esperado**
- **Comportamiento actual**
- **Logs** de error (si aplica)

## 💡 Ideas para Contribuir

### Para Principiantes

- [ ] Mejorar documentación
- [ ] Agregar tests unitarios
- [ ] Corregir typos
- [ ] Mejorar accesibilidad
- [ ] Optimizar performance

### Para Desarrolladores Experimentados

- [ ] Implementar nuevas funcionalidades
- [ ] Mejorar arquitectura
- [ ] Optimizar base de datos
- [ ] Agregar tests de integración
- [ ] Mejorar seguridad

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/crm-clientes-ia/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/crm-clientes-ia/discussions)
- **Email**: tu-email@ejemplo.com

## 🙏 Agradecimientos

¡Gracias por contribuir a este proyecto! Cada contribución, por pequeña que sea, hace una diferencia.

---

**¡Happy Coding! 🚀**
