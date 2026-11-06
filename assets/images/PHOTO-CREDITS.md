# Fotografias — FORGE FITNESS

Fotos reais de banco de imagens, usadas de forma ilustrativa em uma academia fictícia. As pessoas e os locais fotografados não representam a equipe, os alunos ou a unidade da FORGE FITNESS, nem endossam a marca.

Fonte: Pexels. Licença consultada em 6 de novembro de 2026: https://www.pexels.com/license/

A licença permite baixar, modificar e usar as fotografias gratuitamente, inclusive em sites comerciais, sem atribuição obrigatória. Não permite sugerir endosso por pessoas ou marcas retratadas, vender cópias inalteradas, redistribuir como banco de imagens ou usar como marca. Consulte a licença original para as condições completas.

| Arquivos locais (720 e 1440) | Fotógrafo | Página original |
| --- | --- | --- |
| `gym-interior-*.webp` | foad shariyati | https://www.pexels.com/photo/modern-gym-interior-with-weight-training-equipment-29526372/ |
| `equipment-*.webp` | Tima Miroshnichenko | https://www.pexels.com/photo/dumbbells-in-close-up-photography-6389886/ |
| `strength-*.webp` | Victor Freitas | https://www.pexels.com/photo/person-holding-barbell-1092875/ |
| `functional-*.webp` | Leon Ardho | https://www.pexels.com/photo/man-and-woman-holding-battle-ropes-1552242/ |
| `group-class-*.webp` | sum sum | https://www.pexels.com/photo/group-workout-session-in-indoor-gym-38796260/ |

## Substituições de fotografias repetidas — 6 de novembro de 2026

Cada posição de imagem agora usa uma fotografia distinta. As versões 720 e 1440 de cada foto são alternativas responsivas da mesma posição.

- Sobre: `about-interior-*.webp` — https://www.pexels.com/photo/people-dark-rope-sport-6389856/
- Planos: `membership-equipment-*.webp` — https://www.pexels.com/photo/industrial-gym-interior-with-training-equipment-28978375/
- Contato: `contact-interior-*.webp` — https://www.pexels.com/photo/dimly-lit-modern-gym-with-equipment-reflection-29392546/

Mesma licença Pexels e mesmos parâmetros de otimização das fotos anteriores.

## Preparação dos arquivos

As fotos foram baixadas diretamente de `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`, solicitando `auto=compress&cs=tinysrgb&w={largura}&h={metade-da-largura}&fit=crop&fm=webp&q=78`.

- WebP em 720 × 360 e 1440 × 720 pixels, com qualidade 78 e recorte 2:1.
- Dezesseis arquivos em duas resoluções. O navegador escolhe uma versão por imagem via `srcset` e pode reutilizar arquivos em cache entre as páginas.
- Dimensões explícitas no HTML reservam espaço. Imagens secundárias usam `loading="lazy"` e `decoding="async"`; a imagem principal da Home tem `fetchpriority="high"`.
- O site usa somente caminhos locais; nenhuma imagem depende de requisições ao Pexels durante a navegação.
- O tratamento escuro e de saturação é feito pelo CSS, preservando os arquivos locais baixados.

Não foi aberto, executado, pré-visualizado ou testado o site para esta atualização. A inspeção dos arquivos de imagem foi feita separadamente, sem acessar o site.
