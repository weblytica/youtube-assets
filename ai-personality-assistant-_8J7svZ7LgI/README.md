This Make.com scenario automates deep research on personality types using Perplexity's Sonar Deep Research model. Here's the workflow breakdown:

## Scenario Purpose
Batch processes research topics for different personality types (like ISTJ-A), generating comprehensive research documents and storing them in Dropbox.

## Workflow Structure

### 1. **Google Sheets Trigger** (Module 1)
- Reads from "KBPP Personality Data" spreadsheet
- Filters for rows where:
  - Column A (Folder) has content
  - Column D (Content) is empty
- Processes one row at a time
- Extracts: Folder name, Title, Filename

### 2. **Router with Two Paths**

**Path 1: Research Processing** (when row exists)
- **Set Variables** (Module 3): Configures personality type (ISTJ-A) and Dropbox directory
- **Compose Search Query** (Module 2): Creates detailed research prompt focusing on:
  - How specific personality types experience the topic
  - Behavioral patterns, challenges, strengths
  - Communication styles and decision-making
  - Support needs and success strategies
- **Perplexity API Call** (Module 6): Uses sonar-deep-research model with low search context
- **Citation Processing** (Modules 8-9): Extracts and formats citations from research
- **Final Composition** (Module 7): Strips thinking tags, combines research with citations
- **Dropbox Upload** (Module 10): Saves to `/GitHub/Absolutely Everything is Code/personalities/[folder]/[filename]`
- **Sheet Update** (Module 11): Marks row as "Complete" in column D

**Path 2: Scenario Shutdown** (when no rows found)
- **Stop Scenario** (Module 13): Turns off the scenario when processing complete

## Key Technical Details

- **Authentication**: Uses connections for Google, Perplexity, Dropbox, and Make.com
- **Research Template**: Generic enough to work across personality types and topics
- **File Organization**: Structured folder hierarchy based on personality types
- **Progress Tracking**: Updates source spreadsheet to prevent reprocessing
- **Self-Terminating**: Automatically stops when no more rows to process

## Production Considerations

- **Error Handling**: No explicit error handlers visible - add Break handlers for production
- **Rate Limiting**: Processing one row at a time prevents API overload
- **Token Usage**: Perplexity deep research can be expensive - monitor usage
- **File Overwrite**: Set to false, preventing accidental data loss

This is a well-structured batch processing scenario for generating personality-focused research content at scale. Consider adding error handling and monitoring token consumption for production use.
