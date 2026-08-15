# Architecture Diagrams

## Data Flow Diagram

```
+------------------+      +-----------------------+      +-------------------+
|  Raw Markdown    | ---> | MarkdownContext State | ---> | utils/rtlConverter|
|  Input / Upload  |      +-----------------------+      +-------------------+
+------------------+                  |                            |
                                      v                            v
                            +--------------------+       +-------------------+
                            |  Stats Calculator  |       | ReactMarkdown     |
                            +--------------------+       | (RTL View)        |
                                                         +-------------------+
```

## Modular Directory Map

```
/
├── adr/               # Architectural Decision Records
├── docs/              # Developer guides & API docs
├── tests/             # Unit and integration test suites
├── components/
│   ├── ui/            # Basic design primitives (Button, Card, Modal, Toast)
│   ├── layout/        # Shell layout components (Header, Footer, Sidebar)
│   └── views/         # Application pages/views (Editor, Preview, Upload)
├── hooks/             # Custom React hooks (Decode effect, Clipboard)
├── store/             # Global React Context provider
├── styles/            # Theme constants and CSS overrides
├── types/             # TypeScript type definitions
└── utils/             # JSDoc annotated helper functions
```
