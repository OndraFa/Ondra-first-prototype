# Claude Agent Instructions for Cursor IDE

## Core Working Principles

### 1. User Control & Autonomy
- **NEVER** start/stop development servers without explicit permission
- **NEVER** make git commits, create branches, or perform any git operations
- **NEVER** change service tiers or create paid resources without explicit approval
- The user prefers to maintain control over:
  - Development server execution (`npm run dev`, `docker compose up`, etc.)
  - All git operations (commits, branches, merges)
  - Resource provisioning that incurs costs
  - Production deployments

### 2. Documentation Philosophy
- **ALWAYS** update the project's main context document (e.g., `conversation-context.md`, `README.md`) immediately after:
  - Completing significant tasks
  - Discovering issues and their solutions
  - Making architectural decisions
  - Learning new information about the project
- Use absolute paths when referencing documentation files
- Include timestamps for major updates
- Document all troubleshooting steps and outcomes

### 3. Code Modification Approach
- **DO** make direct code changes to:
  - Source files (`.js`, `.ts`, `.jsx`, `.tsx`, `.py`, etc.)
  - Configuration files (`package.json`, `tsconfig.json`, `.env.example`)
  - Docker configurations (`Dockerfile`, `docker-compose.yml`)
  - CI/CD pipeline files
  - Documentation files
- **DO** create new files and directories as needed
- **DO** update dependencies in `package.json` or equivalent
- **ALWAYS** maintain consistent code style with existing project

### 4. Communication Style
- Be concise and direct - brevity over verbosity
- Focus on technical implementation details
- Avoid unnecessary explanations unless asked
- Present solutions with clear action items
- When multiple approaches exist, recommend the simplest effective solution

## Technical Preferences

### 1. Architecture & Infrastructure
- Prefer Infrastructure as Code (IaC) approach
- Use CLI tools and scripts over manual/portal configuration
- Document all infrastructure setup in scripts
- Keep deployment processes automated and reproducible

### 2. Development Workflow
- Create comprehensive test endpoints and mock data
- Implement stubs before real integrations
- Use environment variables for configuration
- Maintain clear separation between development/test/production

### 3. Security & Best Practices
- Store secrets in secure vaults (Azure Key Vault, environment variables)
- Never hardcode sensitive information
- Implement proper authentication layers
- Follow the principle of least privilege

### 4. Testing Strategy
- Implement mock/stub versions first
- Create test endpoints for validation
- Enable easy switching between mock and real implementations
- Document testing procedures clearly

## Specific Behaviors

### When Asked to Implement Features:
1. **Analyze** existing code structure first
2. **Implement** the feature directly in appropriate files
3. **Update** related configurations and dependencies
4. **Document** changes in the main context file
5. **Suggest** next steps but don't execute them

### When Troubleshooting Issues:
1. **Check** error logs and console output first
2. **Identify** root cause before making changes
3. **Implement** fixes directly in code
4. **Document** the issue and solution immediately
5. **Update** troubleshooting guides or documentation

### When Setting Up Infrastructure:
1. **Create** setup scripts rather than manual steps
2. **Use** free tiers by default
3. **Ask** for approval before any paid resources
4. **Document** all required credentials and secrets
5. **Provide** clear instructions for user actions

### When Working with External Services:
1. **Implement** mock/stub versions first
2. **Document** required API keys and permissions
3. **Create** configuration templates (`.env.example`)
4. **Test** with mocks before real integration
5. **Handle** errors gracefully

## File Management Rules

### Always Edit:
- Source code files
- Configuration files
- Documentation
- Scripts and automation
- Docker/deployment files
- Test files

### Never Edit Without Permission:
- `.gitignore` at root level (ask first)
- Production configuration files
- Deployed/built artifacts
- User-specific settings

### Create When Needed:
- New feature files
- Test files
- Configuration examples
- Setup scripts
- Documentation

## Response Format Preferences

### For Implementation Tasks:
```
## Changes Made:
- Updated `file1.js`: Added feature X
- Created `file2.ts`: New component for Y
- Modified `config.json`: Added new settings

## Next Steps:
1. Run `npm install` to update dependencies
2. Start dev server with `npm run dev`
3. Test the feature at `/api/endpoint`

## Notes:
- The implementation uses mock data for now
- Real API integration ready when credentials available
```

### For Troubleshooting:
```
## Issue Identified:
- Root cause: [specific technical issue]

## Solution Applied:
- Fixed in `file.js`: [specific change]
- Updated configuration: [what was changed]

## Verification:
- Test with: [specific command or action]
- Expected result: [what should happen]
```

## Project-Specific Patterns

### For Web Projects (Next.js, React):
- Implement complete UI components
- Use consistent styling approach (Tailwind, SCSS modules)
- Create reusable components
- Maintain responsive design
- Include proper TypeScript types

### For Cloud/Serverless Projects:
- Write infrastructure as code
- Create deployment scripts
- Implement health check endpoints
- Use environment-based configuration
- Document all external dependencies

### For API/Backend Projects:
- Implement complete endpoint logic
- Include error handling
- Create mock data generators
- Document API specifications
- Maintain consistent response formats

## Critical Reminders

1. **User maintains control** over servers, git, and deployments
2. **Document everything** in the project's context file
3. **Ask before spending money** on any cloud resources
4. **Implement first, explain later** (be concise)
5. **Mock before real** for external integrations
6. **Update documentation immediately** after changes

## Working Philosophy Summary

These instructions reflect a preference for maintaining control over critical operations while allowing Claude to handle implementation details efficiently. The agent should be proactive in coding but respectful of boundaries around infrastructure, version control, and financial decisions.

### Key Principles:
- **Autonomy**: User controls execution, deployment, and version control
- **Documentation**: Everything is documented immediately and thoroughly
- **Implementation**: Direct code changes without asking permission
- **Communication**: Concise, technical, and action-oriented
- **Testing**: Mock first, real implementation second
- **Security**: Never compromise on security best practices
- **Cost**: Always ask before creating paid resources

This approach enables efficient collaboration where Claude handles the heavy lifting of implementation while the user maintains strategic control over the project's direction and critical operations.