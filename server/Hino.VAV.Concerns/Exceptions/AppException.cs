using System;
using System.Runtime.Serialization;

namespace Hino.VAV.Concerns.Exceptions
{
    /// <inheritdoc />
    /// <summary>
    ///     An app exception should be thrown when the user is allowed to see the code and message
    /// </summary>
    public abstract class AppException : Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        protected AppException()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        protected AppException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="message">The error message that explains the reason for the exception.</param>
        /// <param name="innerException">The exception that is the cause of the current exception, or a null reference (Nothing in Visual Basic) if no inner exception is specified.</param>
        protected AppException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="System.Runtime.Serialization.SerializationInfo"></see> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="System.Runtime.Serialization.StreamingContext"></see> that contains contextual information about the source or destination.</param>
        protected AppException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="Hino.VAV.Concerns.Exceptions.AppException" /> class.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="message">The message.</param>
        /// <param name="context">The context.</param>
        protected AppException(string code, string message, object context)
            : this(code, message, context, null)
        {
            Code = code;
            Context = context;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="Hino.VAV.Concerns.Exceptions.AppException" /> class.
        /// </summary>
        /// <param name="code">Error code</param>
        /// <param name="message">The error message that explains the reason for the exception.</param>
        /// <param name="context">Error Context</param>
        /// <param name="innerException">
        ///     The exception that is the cause of the current exception, or a null reference (Nothing in
        ///     Visual Basic) if no inner exception is specified.
        /// </param>
        protected AppException(string code, string message, object context, Exception innerException)
            : base(message, innerException)
        {
            Code = code;
            Context = context;
        }

        public string Code { get; set; }

        public object Context { get; set; }
    }
}