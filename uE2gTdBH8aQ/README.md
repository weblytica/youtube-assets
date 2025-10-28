# Make.com AI Agent System Prompt Generator

## Overview
A Claude project designed to generate concise, effective system prompts for Make.com AI agents. This project applies research-backed compression techniques to create prompts between 1,800-2,200 characters that define agent identity and constraints while maintaining functional clarity and repeatability.

## What This Project Does
- **Generates optimized system prompts** for Make.com AI agents within strict character limits
- **Applies compression techniques** without sacrificing functional clarity
- **Ensures global reusability** across multiple scenarios
- **Validates architectural alignment** with Make.com's tool-first philosophy
- **Tests repeatability** across different workflow contexts

## Key Principles

### Make.com Architecture Understanding
Make.com AI agents differ fundamentally from standard LLM implementations:
- **Agents are reasoning nodes** within automation workflows, not chatbots
- **Tools drive behavior** through metadata (names, descriptions, input/output specs)
- **System prompts establish identity**, not specific behaviors
- **Agents are stateless by default** (no memory without thread IDs)
- **Tool selection happens via metadata**, not prompt instructions

### The Tool-First Mindset
The critical insight: **agents rely on tool metadata to make decisions, not system prompts**. Effective prompts establish agent identity and universal constraints while tools communicate specific capabilities through their configurations.

## What System Prompts Should Do
✅ Define agent identity and role  
✅ Establish universal constraints and boundaries  
✅ Specify output format and style  
✅ Set tone and communication approach  
✅ Provide context tools cannot communicate  

## What System Prompts Should NOT Do
❌ Describe when to use specific tools (tools describe themselves)  
❌ Include scenario-specific instructions (use Additional System Instructions)  
❌ Compensate for poorly configured tool metadata  
❌ Provide workflow documentation (belongs in tool descriptions)  
❌ Override tool selection through detailed conditions  

## Compression Techniques
The project applies research-backed methods to maximize information density:
- Remove filler phrases ("please," "in order to," "it is important that")
- Use strategic abbreviations where clear
- Prefer active voice over passive constructions
- Use direct commands over explanatory statements
- Consolidate multi-part instructions
- Include only essential context (no redundancy)

### Example Transformations
❌ "You should always make sure to check the inventory before proceeding with any orders"  
✅ "Check inventory before ordering"

❌ "It's important that you maintain a professional and helpful tone"  
✅ "Use professional, helpful tone"

## Project Structure

### Files Included
1. **make.com-ai-system-prompt-generator-deep-research-file.md** - Comprehensive research on Make.com AI agent architecture, best practices, and common mistakes
2. **make.com-ai-system-prompt-generator-project-instructions.md** - Complete project instructions for Claude
3. **claude-project-factory-project-instructions.md** - Instructions for the Claude Project Factory used to create this project
4. **video-transcript.md** - Transcript of the original video walkthrough

### Success Criteria
✅ Character count: 1,800-2,200  
✅ Global reusability across scenarios  
✅ Clear role definition  
✅ Explicit constraints  
✅ Tool-agnostic (no specific tool instructions)  
✅ Compression maintains clarity  
✅ Markdown formatted  
✅ Repeatable results validated  

## How to Use This Project

### Setup
1. Create a new Claude project
2. Copy the contents of `make.com-ai-system-prompt-generator-project-instructions.md` into the project instructions
3. Add `make.com-ai-system-prompt-generator-deep-research-file.md` as project knowledge (text content)
4. Name the project: **Technology » AI » Make.com AI Agent Prompt Generator**

### Usage Workflow
1. **Provide context** about your AI agent's purpose
2. **Specify capabilities** the agent should have
3. **Define constraints** and boundaries
4. **Request generation** of the system prompt
5. **Review character count** (should be 1,800-2,200)
6. **Test in Make.com** Testing & Training interface
7. **Iterate based on results**

### Example Prompt
```
I need a system prompt for a customer support AI agent that:
- Handles product inquiries and troubleshooting
- Can route to specialists when needed
- Maintains friendly, professional tone
- Works across email, Slack, and web forms
- Should not make pricing commitments or share internal roadmaps
```

## Output Format
The project generates prompts in structured Markdown format:

```markdown
## Agent Role
[2-3 sentence identity definition]

## Core Capabilities
- [Capability 1]
- [Capability 2]
- [Capability 3]

## Constraints
- [Boundary 1]
- [Boundary 2]
- [What agent must NOT do]

## Output Requirements
- [Format specification]
- [Structure requirements]
- [Quality standards]

## Tone & Style
[1-2 sentence tone definition]

**Character Count: [XXXX]/2200**
```

## Advanced Patterns

### Modular Tool Design
Break complex capabilities into focused tools rather than monolithic scenarios. Each tool should have:
- Clear, descriptive name (action-oriented)
- Detailed description specifying when to use/not use
- Well-documented inputs with descriptions
- Structured outputs with clear key names

### Human-in-the-Loop
For sensitive operations, create tools that generate approval requests rather than executing directly.

### Custom Memory
Implement "remember_fact" and "recall_fact" tools that store/retrieve information from databases when conversation continuity is needed.

## Common Mistakes to Avoid
1. **Writing scenario-specific prompts** that limit reusability
2. **Neglecting date/timezone handling** (use text inputs, not date types)
3. **Relying solely on prompts for tool selection** (fix tool metadata first)
4. **Missing Return output modules** in tool scenarios
5. **Using AI-enhanced prompts without review** (they often add bloat)
6. **Excessive thread history** (increases costs linearly)

## When to Use This Project
✅ Creating new Make.com AI agents  
✅ Refining existing agent prompts that underperform  
✅ Standardizing prompts across multiple agents  
✅ Optimizing token usage and costs  
✅ Ensuring architectural alignment with Make.com best practices  

## When NOT to Use This Project
❌ Writing general LLM prompts (not specific to Make.com)  
❌ Creating tool descriptions (that's separate)  
❌ Building conversational AI applications  
❌ Applications requiring sub-second responses  

## Resources
- **Make.com AI Agents Documentation**: Check official docs for latest features
- **Community Examples**: FamilyMate.AI and other community implementations
- **Testing Interface**: Use Make.com's Testing & Training tab extensively

## Credits
Created using the Claude Project Factory methodology. Based on extensive research of Make.com AI agent architecture and community best practices.

## Version History
- **v1.0** - Initial release with 1,800-2,200 character optimization target
- Research file includes patterns from FamilyMate.AI community and official Make.com guidance

---

**Character Count Target**: 1,800-2,200 characters  
**Architecture**: Tool-first, prompt-second  
**Philosophy**: Global reusability, compression with clarity
