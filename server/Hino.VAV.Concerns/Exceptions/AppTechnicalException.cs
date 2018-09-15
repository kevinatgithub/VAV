using System;
using System.Runtime.Serialization;

namespace Hino.VAV.Concerns.Exceptions
{
    /// <inheritdoc />
    /// <summary>
    ///     A technical exception should be thrown when it's an exception caused a technical issue.
    /// </summary>
    public class AppTechnicalException : AppException
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        public AppTechnicalException(string code, string message)
            : base(code, message, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="context">The context.</param>
        public AppTechnicalException(string code, string message, object context)
            : base(code, message, context)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="exception">The exception.</param>
        public AppTechnicalException(string code, string message, Exception exception)
            : base(code, message, null, exception)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="context">The context.</param>
        /// <param name="exception">The exception.</param>
        public AppTechnicalException(string code, string message, object context, Exception exception)
            : base(code, message, context, exception)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        protected AppTechnicalException()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        protected AppTechnicalException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="message">The error message that explains the reason for the exception.</param>
        /// <param name="innerException">The exception that is the cause of the current exception, or a null reference (Nothing in Visual Basic) if no inner exception is specified.</param>
        protected AppTechnicalException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppTechnicalException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="System.Runtime.Serialization.SerializationInfo"></see> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="System.Runtime.Serialization.StreamingContext"></see> that contains contextual information about the source or destination.</param>
        protected AppTechnicalException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}