import { z } from 'zod'

export const ContentPartsTypeSchema = z.enum([
  'text',
  'audio_transcription',
  'real_time_user_audio_video_asset_pointer',
  'image_asset_pointer',
  'audio_asset_pointer',
])

export const ContentPartMetadataSchema = z.object({
  dalle: z
    .object({
      gen_id: z.string(),
      prompt: z.string(),
      seed: z.number().nullable(),
      serialization_title: z.string(),
    })
    .nullable()
    .optional(),
})

export const ContentPartsSchema = z
  .object({
    content_type: ContentPartsTypeSchema,
    text: z.string().optional(),
    direction: z.enum(['in', 'out']).optional(),
    decoding_id: z.string().nullable().optional(),
    expiry_datetime: z.string().nullable().optional(),
    frames_asset_pointers: z.array(z.string()).optional(),
    video_container_asset_pointer: z.string().nullable().optional(),
    audio_asset_pointer: z
      .object({
        expiry_datetime: z.string().nullable(),
        content_type: z.string(),
        asset_pointer: z.string(),
        size_bytes: z.number(),
        format: z.string(),
        metadata: z.any(),
      })
      .strict()
      .optional(),
    audio_start_timestamp: z.number().optional(),
    asset_pointer: z.string().optional(),
    size_bytes: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    fovea: z.any().optional(),
    metadata: ContentPartMetadataSchema.nullable().optional(),
    format: z.string().optional(),
  })
  .strict()

export const TextSchema = z
  .object({
    content_type: z.literal('text'),
    parts: z.array(ContentPartsSchema.or(z.string())),
  })
  .strict()

export const CodeSchema = z
  .object({
    content_type: z.literal('code'),
    language: z.string(),
    response_format_name: z.string().nullable(),
    text: z.string(),
  })
  .strict()

export const ToolOutputSchema = z
  .object({
    content_type: z.literal('tool_output'),
  })
  .strict()

export const MediaSchema = z
  .object({
    content_type: z.literal('media'),
  })
  .strict()

export const UserEditableContextSchema = z
  .object({
    content_type: z.literal('user_editable_context'),
    user_profile: z.string(),
    user_instructions: z.string(),
  })
  .strict()

export const MultimodalTextSchema = z
  .object({
    content_type: z.literal('multimodal_text'),
    parts: z.array(ContentPartsSchema.or(z.string())),
  })
  .strict()

export const TetherBrowsingDisplaySchema = z
  .object({
    content_type: z.literal('tether_browsing_display'),
    result: z.any(),
    summary: z.any(),
    assets: z.any(),
    tether_id: z.any(),
  })
  .strict()

export const ExecutionOutputSchema = z
  .object({
    content_type: z.literal('execution_output'),
    text: z.string(), // JSON string
  })
  .strict()

// Define schema for the objects within the 'workspaces' array
export const WorkspaceSchema = z
  .object({
    id: z.string(),
    app_id: z.string(),
    app_name: z.string(),
    title: z.string(),
    content_type: z.string(), // e.g., "window"
  })
  .strict()

// Define schema for the objects within the 'context_parts' array
export const ContextPartSchema = z
  .object({
    workspace_id: z.string(),
    text: z.string(),
    textfield_id: z.string(),
    path: z.string(),
    path_hash: z.string().nullable(),
    annotations: z.any().nullable(), // Assuming 'any' for now, can be refined
    content_type: z.string(), // e.g., "text"
    truncated_head_lines: z.any().nullable(), // Assuming 'any' for now
    truncated_tail_lines: z.any().nullable(), // Assuming 'any' for now
    supports_editing: z.boolean(),
  })
  .strict()

export const AppPairingContentSchema = z
  .object({
    content_type: z.literal('app_pairing_content'),
    custom_instructions: z.string(),
    workspaces: z.array(WorkspaceSchema).nullable().optional(),
    context_parts: z.array(ContextPartSchema).nullable().optional(),
  })
  .strict()

export const TetherQuoteSchema = z
  .object({
    content_type: z.literal('tether_quote'),
    url: z.string(),
    domain: z.string(),
    text: z.string(),
    title: z.string(),
    tether_id: z.string().nullable(),
  })
  .strict()

export const CitationContentSchema = z
  .object({
    content_type: z.literal('citation'),
  })
  .strict()

export const AudioTranscriptionSchema = z.object({
  content_type: z.literal('audio_transcription'),
  text: z.string(),
  direction: z.enum(['in', 'out']).optional(),
  decoding_id: z.string().nullable().optional(),
})

export const AudioAssetPointerSchema = z.object({
  content_type: z.literal('audio_asset_pointer'),
  expiry_datetime: z.string(),
  asset_pointer: z.string(),
  size_bytes: z.number(),
  format: z.string(),
  metadata: z.object({
    start_timestamp: z.number().nullable(),
    end_timestamp: z.number().nullable(),
    pretokenized_vq: z.any().nullable(),
    interruptions: z.any().nullable(),
    original_audio_source: z.any().nullable(),
    transcription: z.any().nullable(),
    start: z.number(),
    end: z.number(),
  }),
})

export const RealTimeUserAudioVideoAssetPointerSchema = z.object({
  content_type: z.literal('real_time_user_audio_video_asset_pointer'),
  expiry_datetime: z.string(),
  frames_asset_pointers: z.array(z.string()).optional(),
  video_container_asset_pointer: z.string().nullable().optional(),
  audio_asset_pointer: AudioAssetPointerSchema,
  audio_start_timestamp: z.number(),
})

export const ImageAssetPointerSchema = z.object({
  content_type: z.literal('image_asset_pointer'),
  asset_pointer: z.string(),
  size_bytes: z.number(),
  width: z.number(),
  height: z.number(),
  fovea: z.number(),
  metadata: z.object({
    dalle: z
      .object({
        gen_id: z.string(),
        prompt: z.string(),
        seed: z.number(),
        parent_gen_id: z.string().nullable(),
        edit_op: z.string().nullable(),
        serialization_title: z.string(),
      })
      .nullable(),
    gizmo: z.any().nullable(),
    emu_omit_glimpse_image: z.any().nullable(),
    emu_patches_override: z.any().nullable(),
    sanitized: z.boolean(),
    asset_pointer_link: z.any().nullable(),
  }),
})

// Schema for content_type: thoughts
export const ThoughtsContentSchema = z
  .object({
    content_type: z.literal('thoughts'),
    thoughts: z.array(
      z.object({
        summary: z.string(),
        content: z.string(),
      }),
    ),
    source_analysis_msg_id: z.string(),
  })
  .strict()

// Schema for content_type: reasoning_recap
export const ReasoningRecapContentSchema = z
  .object({
    content_type: z.literal('reasoning_recap'),
    content: z.string(),
  })
  .strict()

// Schema for content_type: sonic_webpage
export const SonicWebpageContentSchema = z
  .object({
    content_type: z.literal('sonic_webpage'),
    url: z.string(),
    domain: z.string(),
    title: z.string(),
    text: z.string(),
    snippet: z.string().nullable().optional(),
    pub_date: z.string().nullable().optional(),
    crawl_date: z.string().nullable().optional(),
    pub_timestamp: z.number().nullable().optional(),
    ref_id: z.string(),
  })
  .strict()

export const ContentSchema = z.discriminatedUnion('content_type', [
  TextSchema,
  CodeSchema,
  ToolOutputSchema,
  CitationContentSchema,
  MediaSchema,
  UserEditableContextSchema,
  MultimodalTextSchema,
  TetherBrowsingDisplaySchema,
  ExecutionOutputSchema,
  AppPairingContentSchema,
  TetherQuoteSchema,
  AudioTranscriptionSchema,
  AudioAssetPointerSchema,
  RealTimeUserAudioVideoAssetPointerSchema,
  ImageAssetPointerSchema,
  ThoughtsContentSchema,
  ReasoningRecapContentSchema,
  SonicWebpageContentSchema,
])

export const AuthorSchema = z
  .object({
    role: z.enum(['user', 'assistant', 'system', 'tool']),
    name: z.string().nullable(),
    metadata: z.any(),
  })
  .strict()

export const AggregateResultSchema = z
  .object({
    code: z.string(),
    final_expression_output: z.string().nullable().optional(),
    end_time: z.number().nullable(),
    jupyter_messages: z.array(z.unknown()),
    messages: z.array(
      z.object({
        image_url: z.string().optional(),
        message_type: z.enum(['image', 'stream']).optional(),
        sender: z.literal('server'),
        time: z.number(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    ),
    run_id: z.string(),
    start_time: z.number(),
    status: z.enum([
      'success',
      'error',
      'failed_with_in_kernel_exception',
      'cancelled',
    ]),
    update_time: z.number(),
    in_kernel_exception: z.any().optional(),
    system_exception: z.any().optional(),
    timeout_triggered: z.any().optional(),
    caterpillar_selected_sources: z.any().optional(),
    selected_github_repos: z.any().optional(),
    is_error: z.boolean().optional(),
    retrieval_turn_number: z.number().optional(),
    retrieval_file_index: z.number().optional(),
    cot_tool: z.any().optional(),
  })
  .strict()

export const CitationSchema = z
  .object({
    start_ix: z.number(),
    end_ix: z.number(),
    citation_format_type: z.string().optional(),
    invalid_reason: z.string().optional(),
    metadata: z
      .object({
        extra: z
          .object({
            cited_message_idx: z.number(),
            evidence_text: z.string().optional(),
          })
          .nullable()
          .optional(),
        text: z.string().optional(),
        title: z.string().optional(),
        type: z.string(),
        url: z.string().optional(),
      })
      .optional(),
    search_display_string: z.string().optional(),
    searched_display_string: z.string().optional(),
    caterpillar_selected_sources: z.any().optional(),
    selected_github_repos: z.any().optional(),
    is_error: z.boolean().optional(),
    retrieval_turn_number: z.number().optional(),
    retrieval_file_index: z.number().optional(),
    cot_tool: z.any().optional(),
  })
  .strict()

export const CitationMetadataSchema = z
  .object({
    citation_format: z.object({ name: z.string() }),
    metadata_list: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        text: z.string(),
      }),
    ),
  })
  .optional()

export const MessageMetadataSchema = z
  .object({
    finish_details: z.any().optional(),
    is_complete: z.boolean().optional(),
    citations: z.array(CitationSchema).optional(),
    content_references: z.any().optional(),
    message_type: z.any().optional(),
    model_slug: z.any().optional(),
    default_model_slug: z.any().optional(),
    parent_id: z.any().optional(),
    request_id: z.any().optional(),
    timestamp_: z.any().optional(),
    message_source: z.any().optional(),
    timestamp_ms: z.any().optional(),
    is_visually_hidden_from_conversation: z.any().optional(),
    user_context_message_data: z.any().optional(),
    is_user_system_message: z.any().optional(),
    search_source: z.any().optional(),
    client_reported_search_source: z.any().optional(),
    search_result_groups: z.any().optional(),
    safe_urls: z.any().optional(),
    message_locale: z.any().optional(),
    image_results: z.any().optional(),
    command: z
      .enum([
        'click',
        'search',
        'quote',
        'quote_lines',
        'scroll',
        'create_textdoc',
        'update_textdoc',
        'open_url',
        'msearch',
        'prompt',
        'spinner',
        'context_stuff',
        'mclick',
        'clarify_with_text',
        'start_research_task',
      ])
      .optional(),
    status: z.any().optional(),
    real_time_audio_has_video: z.any().optional(),
    canvas: z.any().optional(),
    voice_mode_message: z.any().optional(),
    attachments: z.any().optional(),
    _cite_metadata: z.any().optional(),
    args: z.any().optional(),
    rebase_system_message: z.any().optional(),
    paragen_variants_info: z.any().optional(),
    paragen_variant_choice: z.any().optional(),
    gizmo_id: z.any().optional(),
    finished_text: z.any().optional(),
    initial_text: z.any().optional(),
    requested_model_slug: z.any().optional(),
    aggregate_result: AggregateResultSchema.optional(),
    pending_memory_info: z.any().optional(),
    jit_plugin_data: z.any().optional(),
    snorkle_status: z.any().optional(),
    sonic_classification_result: z.any().optional(),
    exclusive_key: z.any().optional(),
    app_pairing: z.any().optional(),
    cloud_doc_urls: z.array(z.string().nullable()).optional(),
    serialization_metadata: z.any().optional(),
    ada_visualizations: z.any().optional(),
    augmented_paragen_prompt_label: z.any().optional(),
    kwargs: z.any().optional(),
    pad: z.any().optional(),
    invoked_plugin: z.any().optional(),
    dalle: z.any().optional(),
    system_hints: z.array(z.any()).optional(),
    permissions: z.array(z.any()).optional(),
    is_loading_message: z.boolean().optional(),
    async_task_title: z.string().optional(),
    async_task_prompt: z.string().optional(),
    async_task_type: z.string().optional(),
    async_task_status_messages: z.any().optional(),
    b1de6e2_s: z.any().optional(),
    async_task_id: z.string().optional(),
    async_task_conversation_id: z.string().optional(),
    async_task_created_at: z.string().optional(),
    deep_research_version: z.string().optional(),
    is_async_task_result_message: z.boolean().optional(),
    b1de6e2_rm: z.any().optional(),
    search_queries: z.array(z.any()).optional(),
    image_gen_async: z.any().optional(),
    trigger_async_ux: z.any().optional(),
    image_gen_title: z.string().optional(),
    refresh_key_info: z.any().optional(),
    debug_sonic_thread_id: z.any().optional(),
    rebase_developer_message: z.any().optional(),
    reasoning_status: z.any().optional(),
    finished_duration_sec: z.number().optional(),
    search_display_string: z.string().optional(),
    searched_display_string: z.string().optional(),
    caterpillar_selected_sources: z.any().optional(),
    selected_github_repos: z.any().optional(),
    is_error: z.boolean().optional(),
    retrieval_turn_number: z.number().optional(),
    retrieval_file_index: z.number().optional(),
    cot_tool: z.any().optional(),
  })
  .strict()

export const MessageSchema = z
  .object({
    id: z.string(),
    author: AuthorSchema,
    create_time: z.number().nullable(),
    update_time: z.number().nullable(),
    content: ContentSchema,
    status: z.string(),
    end_turn: z.boolean().nullable(),
    weight: z.number(),
    metadata: MessageMetadataSchema,
    recipient: z.enum([
      'all',
      'browser',
      'python',
      'dalle.text2im',
      'assistant',
      'web',
      'canmore.create_textdoc',
      'canmore.update_textdoc',
      'bio',
      'myfiles_browser',
      'gpts_webpilot_ai__jit_plugin.webPageReader',
      'diagrams_helpful_dev__jit_plugin.get_DiagramGuidelinesRoute',
      'diagrams_helpful_dev__jit_plugin.get__MermaidRoute',
      'research_kickoff_tool.start_research_task',
      't2uay3k.sj1i4kz',
      'web.run',
      'web.search',
      'user',
      'web.open_url',
      'canmore.comment_textdoc',
    ]),
    channel: z.string().nullable(),
  })
  .strict()

export const MessageNodeSchema = z
  .object({
    id: z.string(),
    message: MessageSchema.nullable(),
    parent: z.string().nullable(),
    children: z.array(z.string()),
  })
  .strict()

export const ChatThreadSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    create_time: z.number(),
    update_time: z.number(),
    mapping: z.record(MessageNodeSchema),
    moderation_results: z.any(),
    current_node: z.any(),
    plugin_ids: z.array(z.string()).nullable(),
    conversation_id: z.string().optional(),
    conversation_template_id: z.string().nullable(),
    conversation_origin: z.string().nullable(),
    gizmo_id: z.string().nullable(),
    gizmo_type: z.string().nullable(),
    is_archived: z.boolean(),
    is_starred: z.boolean().nullable(),
    safe_urls: z.array(z.string()),
    default_model_slug: z.string().nullable(),
    voice: z.string().nullable(),
    async_status: z.number().nullable(),
    disabled_tool_ids: z.array(z.string()).nullable(),
    blocked_urls: z.array(z.string()).optional(),
    is_do_not_remember: z.boolean().nullable().optional(),
    memory_scope: z.string().optional(),
  })
  .strict()

// Root Export Schema
export const ChatExportSchema = z.array(ChatThreadSchema)

export const parseChatExport = (data: any) => {
  const result = ChatExportSchema.safeParse(data)
  if (result.success) {
    return result.data
  } else {
    for (const issue of result.error.issues.slice(0, 10)) {
      const message = `Message: ${issue.message}, Path: ${
        issue.path.length > 0 ? issue.path.join('.') : '.'
      }, Data: ${JSON.stringify(data[issue.path[0]]).slice(0, 100)}...`
      console.debug(message)
    }

    throw new Error('Parsing failed')
  }
}

export type ChatExport = z.infer<typeof ChatExportSchema>
export type MessageNode = z.infer<typeof MessageNodeSchema>
export type Content = z.infer<typeof ContentSchema>
